use base64::{engine::general_purpose::STANDARD, Engine as _};

fn looks_like_svg(s: &str) -> bool {
	let lower = s.to_ascii_lowercase();
	lower.contains("<svg") && lower.contains("</svg>")
}

#[tauri::command]
pub fn svg_to_base64(svg: String) -> Result<String, String> {
	let svg = svg.trim().to_string();

	if svg.is_empty() {
		return Err("SVG 不能为空".into());
	}

	if !looks_like_svg(&svg) {
		return Err("看起来不是有效的 SVG（需要包含 <svg>...</svg>）".into());
	}

	Ok(STANDARD.encode(svg.as_bytes()))
}

#[tauri::command]
pub fn svg_to_data_url(svg: String) -> Result<String, String> {
	let b64 = svg_to_base64(svg)?;
	Ok(format!("data:image/svg+xml;base64,{b64}"))
}
