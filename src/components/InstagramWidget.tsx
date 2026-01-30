import { Instagram, Heart, MessageCircle } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface InstagramPost {
  id: string;
  imageUrl: string;
  likes: number;
  comments: number;
  caption?: string;
}

interface InstagramWidgetProps {
  username: string;
  posts?: InstagramPost[];
}

// Placeholder posts for front-end representation
const placeholderPosts: InstagramPost[] = [
  { id: "1", imageUrl: "/placeholder.svg", likes: 12453, comments: 234, caption: "Training day 💪" },
  { id: "2", imageUrl: "/placeholder.svg", likes: 8721, comments: 156, caption: "Competition ready" },
  { id: "3", imageUrl: "/placeholder.svg", likes: 15302, comments: 412, caption: "New PR! 🏆" },
];

const formatNumber = (num: number): string => {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
  if (num >= 1000) return (num / 1000).toFixed(1) + "K";
  return num.toString();
};

export const InstagramWidget = ({ username, posts = placeholderPosts }: InstagramWidgetProps) => {
  return (
    <div className="border border-border rounded-lg p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400">
          <Instagram className="h-4 w-4 text-white" />
        </div>
        <div>
          <h2 className="text-sm font-semibold text-foreground uppercase tracking-wide">
            Instagram
          </h2>
          <a 
            href={`https://instagram.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            @{username}
          </a>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-3 gap-2">
        {posts.slice(0, 3).map((post) => (
          <a
            key={post.id}
            href={`https://instagram.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden rounded-md bg-muted"
          >
            <AspectRatio ratio={1}>
              <img
                src={post.imageUrl}
                alt={post.caption || "Instagram post"}
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                <span className="flex items-center gap-1 text-white text-xs font-medium">
                  <Heart className="h-3.5 w-3.5 fill-white" />
                  {formatNumber(post.likes)}
                </span>
                <span className="flex items-center gap-1 text-white text-xs font-medium">
                  <MessageCircle className="h-3.5 w-3.5 fill-white" />
                  {formatNumber(post.comments)}
                </span>
              </div>
            </AspectRatio>
          </a>
        ))}
      </div>

      {/* View Profile Link */}
      <a
        href={`https://instagram.com/${username}`}
        target="_blank"
        rel="noopener noreferrer"
        className="block mt-4 text-center text-xs text-muted-foreground hover:text-foreground transition-colors"
      >
        View full profile →
      </a>
    </div>
  );
};
