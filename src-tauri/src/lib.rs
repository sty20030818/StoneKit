// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
mod commands;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_dialog::init())
        .invoke_handler(tauri::generate_handler![
            commands::svg::svg_to_base64,
            commands::svg::svg_to_data_url,
            commands::image_compress::compress_start,
            commands::image_compress::compress_cancel,
            commands::image_compress::compress_status,
            commands::fs::get_file_metadata,
            commands::fs::get_image_thumbnail,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
