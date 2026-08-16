using Microsoft.AspNetCore.Mvc;
using System.Text;
using System.Text.Json;

namespace MoiSpecial.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ReviewsController : ControllerBase
{
    private readonly HttpClient _httpClient;
    private const string ApiKey = "AIzaSyBWYXWuBQ3JN7bKAxHWC_bt3QKAY8M_24o";

    public ReviewsController(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    [HttpGet]
    public async Task<IActionResult> GetLiveReviews()
    {
        try
        {
            var request = new HttpRequestMessage(HttpMethod.Post, "https://places.googleapis.com/v1/places:searchText");
            request.Headers.Add("X-Goog-Api-Key", ApiKey);
            request.Headers.Add("X-Goog-FieldMask", "places.id,places.displayName,places.rating,places.userRatingCount,places.reviews");

            var payload = new
            {
                textQuery = "Moi Fırın Sırrın Karşıyaka Şanlıurfa",
                languageCode = "tr"
            };

            request.Content = new StringContent(JsonSerializer.Serialize(payload), Encoding.UTF8, "application/json");

            var response = await _httpClient.SendAsync(request);
            var content = await response.ContentReadAsStringAsync();

            if (response.IsSuccessStatusCode)
            {
                return Content(content, "application/json");
            }

            return StatusCode((int)response.StatusCode, content);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = ex.Message });
        }
    }
}
