//! 文件系统操作命令模块

use serde::Serialize;
use std::fs;

/// 文件元数据
#[derive(Debug, Clone, Serialize)]
pub struct FileMetadata {
    pub size: u64,
}

/// 获取文件元数据
#[tauri::command]
pub fn get_file_metadata(path: String) -> Result<FileMetadata, String> {
    let metadata = fs::metadata(&path).map_err(|e| format!("无法读取文件元数据: {}", e))?;

    Ok(FileMetadata {
        size: metadata.len(),
    })
}

/// 生成图片缩略图（返回 base64）
#[tauri::command]
pub fn get_image_thumbnail(path: String, max_size: u32) -> Result<String, String> {
    use base64::Engine;
    use image::ImageReader;
    use std::io::Cursor;

    // 读取图片
    let img = ImageReader::open(&path)
        .map_err(|e| format!("无法打开图片: {}", e))?
        .decode()
        .map_err(|e| format!("无法解码图片: {}", e))?;

    // 生成缩略图
    let thumbnail = img.thumbnail(max_size, max_size);

    // 编码为 JPEG
    let mut buffer = Cursor::new(Vec::new());
    thumbnail
        .write_to(&mut buffer, image::ImageFormat::Jpeg)
        .map_err(|e| format!("无法编码缩略图: {}", e))?;

    // 转换为 base64
    let base64_str = base64::engine::general_purpose::STANDARD.encode(buffer.get_ref());

    Ok(format!("data:image/jpeg;base64,{}", base64_str))
}
