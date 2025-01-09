export interface FeatureImage {
  url: string;
  preview_url: string;
}

export interface PostMetadata {
  published: boolean;
  layout: string;
  title: string;
  author?: string;
  minutes_read?: number;
  feature_image?: FeatureImage;
  caption?: string;
  meta_description?: string;
  tags?: string[];
}
