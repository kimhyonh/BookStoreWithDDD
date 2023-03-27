using Api.Dtos;
using Ardalis.GuardClauses;
using AutoMapper;
using Domain.Persistances;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/[Controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private readonly ILogger<WeatherForecastController> _logger;
        private readonly IMapper _mapper;
        private readonly IPersistWeatherForcast _repo;

        public WeatherForecastController(
            ILogger<WeatherForecastController> logger,
            IMapper mapper,
            IPersistWeatherForcast repo
        )
        {
            _logger = Guard.Against.Null(logger, nameof(logger));
            _mapper = Guard.Against.Null(mapper, nameof(mapper));
            _repo = Guard.Against.Null(repo, nameof(repo));
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<IEnumerable<WeatherForecast>> List()
        {
            return Ok(_mapper.Map<IEnumerable<WeatherForecast>>(_repo.GetAll()));
        }
    }
}