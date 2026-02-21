

import { useState, useEffect } from 'react';

interface BlogPost {
  title: string;
  link: string;
  pubDate: string;
  author: string;
  description: string;
  thumbnail: string | null;
}

interface BlogResponse {
  success: boolean;
  count: number;
  data: BlogPost[];
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const baseUrl = import.meta.env.NEXT_PUBLIC_API_BACKEND_BASE_URL;
        const response = await fetch(`${baseUrl}api/medium/technology`);
        const data: BlogResponse = await response.json();
        if (data.success) {
          setPosts(data.data);
        }
      } catch (error) {
        console.error('Failed to fetch blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    } catch (e) {
      return dateString;
    }
  };

  if (loading) {
     return (
        <div className="min-h-screen bg-slate-950 pt-24 text-white flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-400"></div>
        </div>
     );
  }

  if (posts.length === 0) {
      return (
        <div className="min-h-screen bg-slate-950 pt-24 text-white flex items-center justify-center">
             <p>No articles found.</p>
        </div>
      );
  }

  const mainPost = posts[0];
  const sidePosts = posts.slice(1);

  return (
    <div className="min-h-screen bg-slate-950 pt-24 text-white">
      {/* Hero Section */}
      <div className="relative py-20 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-green-500/20 rounded-full blur-[120px]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
            Writings from our team
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Thoughts, strategies, and insights on the future of recruitment and AI.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Main Featured Post - Left 2/3 */}
          <div className="lg:col-span-2 group cursor-pointer" onClick={() => window.open(mainPost.link, '_blank')}>
            <div className={`aspect-video rounded-2xl bg-slate-800 mb-6 overflow-hidden relative shadow-2xl transition-all duration-300 hover:shadow-green-900/20`}>
                {mainPost.thumbnail ? (
                    <img src={mainPost.thumbnail} alt={mainPost.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                         <span className="text-slate-600 text-lg">No Image</span>
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                   <div className="text-green-400 text-sm font-semibold tracking-wider uppercase mb-3 bg-green-900/30 px-3 py-1 rounded-full w-fit backdrop-blur-sm border border-green-500/20">
                    Technology
                  </div>
                   <h3 className="text-3xl md:text-5xl font-bold mb-4 group-hover:text-green-400 transition-colors leading-tight">
                    {mainPost.title}
                  </h3>
                   <div className="text-slate-300 text-base md:text-lg flex items-center gap-3">
                    <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> 5 mins read</span>
                    <span className="text-slate-600">•</span>
                    <span>{formatDate(mainPost.pubDate)}</span>
                  </div>
                </div>
            </div>
            <p className="text-slate-400 text-lg leading-relaxed line-clamp-3 pl-1">
                {mainPost.description}
            </p>
          </div>

          {/* Side List - Right 1/3 - Scrollable */}
          <div className="h-[calc(100vh-120px)] overflow-y-auto pr-2 custom-scrollbar space-y-4">
             {sidePosts.map((post, index) => (
               <div key={`${post.title}-${index}`} className="group cursor-pointer flex gap-4 p-3 rounded-xl hover:bg-slate-900/50 transition-colors" onClick={() => window.open(post.link, '_blank')}>
                  <div className={`w-40 aspect-video rounded-lg bg-slate-800 shrink-0 overflow-hidden relative`}>
                        {post.thumbnail ? (
                             <img src={post.thumbnail} alt={post.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                        ) : (
                            <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 icon-placeholder flex items-center justify-center text-xs text-slate-600">No Img</div>
                        )}
                  </div>
                  <div className="flex flex-col justify-center">
                    <h3 className="text-sm font-bold mb-1 group-hover:text-green-400 transition-colors leading-snug line-clamp-2">
                        {post.title}
                    </h3>
                    <div className="text-slate-500 text-xs mb-1">
                        {post.author}
                    </div>
                    <div className="text-slate-500 text-xs">
                        {formatDate(post.pubDate)}
                    </div>
                  </div>
               </div>
             ))}
          </div>
        </div>
      </div>
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(15, 23, 42, 0.5);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(74, 222, 128, 0.2);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(74, 222, 128, 0.4);
        }
      `}</style>
    </div>
  );
}
