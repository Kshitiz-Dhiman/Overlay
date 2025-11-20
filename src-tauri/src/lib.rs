use serde::{Deserialize, Serialize};
use reqwest::header::USER_AGENT;

#[derive(Serialize, Deserialize, Debug)]
struct Lyrics {
    id: u32,
    name: String,
    trackName: String,
    artistName: String,
    albumName: String,
    duration: f32,
    instrumental: bool,
    plainLyrics: String,
    syncedLyrics: String,
}

#[tauri::command]
async fn fetch_lyrics(track: String, artist: String) -> Result<Lyrics, String> {
    println!("=== DEBUG: fetch_lyrics called ===");
    println!("Track: '{}'", track);
    println!("Artist: '{}'", artist);
    
    let client = reqwest::Client::new();
    let request = client
        .get("https://lrclib.net/api/get")
        .query(&[("track_name", &track), ("artist_name", &artist)])
        .header(USER_AGENT, "LyricsOverlay/1.0")
        .build()
        .map_err(|e| format!("Failed to build request: {}", e))?;
    
    println!("Request URL: {}", request.url());
    
    let response = client.execute(request)
        .await
        .map_err(|e| format!("Failed to send request: {}", e))?;

    let status = response.status();
    println!("Response status: {}", status);

    if !status.is_success() {
        let error_body = response.text().await.unwrap_or_else(|_| "Could not read response body".to_string());
        println!("Error response body: {}", error_body);
        return Err(format!("Failed to fetch lyrics: HTTP {} - {}", status, error_body));
    }
    
    let response_text = response.text().await
        .map_err(|e| format!("Failed to read response: {}", e))?;
    
    println!("Response body: {}", response_text);
    
    let lyrics_json: Lyrics = serde_json::from_str(&response_text)
        .map_err(|e| format!("Failed to parse response: {}", e))?;
    
    println!("=== DEBUG: Successfully parsed lyrics ===");
    Ok(lyrics_json)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![fetch_lyrics])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}