// Add films you own/are authorised to show. provider: 'youtube' | 'vimeo' | 'file'. id = video ID (or file URL for 'file').
export interface Film { title: string; provider: 'youtube' | 'vimeo' | 'file'; id: string; event?: string; couple?: string; location?: string; description?: string }
export const films: Film[] = [];
