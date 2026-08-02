const BASE_URL = 'http://localhost:8000';

export const normalizeGalleryType = (value) => {
  if (!value) return '';

  const normalized = String(value).trim().toLowerCase();
  if (normalized === 'all') return 'ALL';
  if (normalized === 'images') return 'image';
  if (normalized === 'videos') return 'video';
  if (normalized === 'reels') return 'reel';

  return normalized;
};

export const getMediaUrl = (value) => {
  if (!value) return '';

  const url = String(value);
  if (/^(https?:|data:|blob:)/i.test(url)) return url;

  return url.startsWith('/') ? `${BASE_URL}${url}` : `${BASE_URL}/${url}`;
};

export const getGalleryRoute = (value) => {
  const normalized = normalizeGalleryType(value);
  return !normalized || normalized === 'ALL' ? '/gallery' : `/gallery/${normalized}`;
};

const getYouTubeVideoId = (parsed) => {
  if (parsed.hostname.includes('youtu.be')) {
    return parsed.pathname.split('/').filter(Boolean)[0] || '';
  }

  if (parsed.hostname.includes('youtube.com')) {
    if (parsed.pathname.startsWith('/watch')) {
      return parsed.searchParams.get('v') || '';
    }

    const segments = parsed.pathname.split('/').filter(Boolean);
    const embedIndex = segments.findIndex((segment) => ['embed', 'shorts', 'live'].includes(segment));
    if (embedIndex >= 0 && segments[embedIndex + 1]) {
      return segments[embedIndex + 1];
    }

    return segments[0] || '';
  }

  return '';
};

export const getYouTubeEmbedUrl = (value) => {
  if (!value) return '';

  try {
    const parsed = new URL(value);
    if (parsed.hostname.includes('youtu.be') || parsed.hostname.includes('youtube.com')) {
      const videoId = getYouTubeVideoId(parsed);
      return videoId ? `https://www.youtube.com/embed/${videoId}` : '';
    }

    if (parsed.hostname.includes('vimeo.com')) {
      const videoId = parsed.pathname.split('/').filter(Boolean).pop();
      return videoId ? `https://player.vimeo.com/video/${videoId}` : '';
    }

    return '';
  } catch {
    return '';
  }
};

export const canEmbedUrl = (value) => {
  return Boolean(getYouTubeEmbedUrl(value));
};