import React from 'react';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

const featuredPosts = [
  {
    category: 'AI IN HR',
    title: 'How Bad Hires Are Reduced by AI in Recruiting Before They Even Happen',
    date: '23 Jan 2026',
    readTime: '7 mins read',
    image: 'bg-indigo-900', // Placeholder class
    featured: true
  },
  {
    category: 'RECRUITMENT AUTOMATION',
    title: 'The Future of Applicant Tracking Systems',
    date: '20 Jan 2026',
    readTime: '5 mins read',
    image: 'bg-blue-900',
    featured: false
  },
  {
    category: 'HIRING TRENDS',
    title: 'Top 5 Hiring Trends to Watch in 2026',
    date: '18 Jan 2026',
    readTime: '6 mins read',
    image: 'bg-purple-900',
    featured: false
  }
];

export default function BlogPage() {
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

      {/* Search and Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="flex justify-between items-center mb-12 border-b border-slate-800 pb-6">
          <h2 className="text-2xl font-bold">Featured Articles</h2>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search posts..." 
              className="w-full bg-slate-900 border border-slate-700 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-primary transition-colors placeholder:text-slate-600"
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Featured Post - Left 2/3 */}
          <div className="lg:col-span-2 group cursor-pointer">
            <div className={`aspect-video rounded-2xl ${featuredPosts[0].image} mb-6 overflow-hidden relative`}>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                   <div className="text-green-400 text-sm font-semibold tracking-wider uppercase mb-2">
                    {featuredPosts[0].category}
                  </div>
                   <h3 className="text-3xl font-bold mb-4 group-hover:text-green-400 transition-colors">
                    {featuredPosts[0].title}
                  </h3>
                   <div className="text-slate-400 text-sm flex items-center gap-2">
                    <span>{featuredPosts[0].readTime}</span>
                    <span>•</span>
                    <span>{featuredPosts[0].date}</span>
                  </div>
                </div>
            </div>
          </div>

          {/* Side List - Right 1/3 */}
          <div className="space-y-8">
             {featuredPosts.slice(1).map((post) => (
               <div key={post.title} className="group cursor-pointer">
                  <div className={`aspect-[3/2] rounded-xl ${post.image} mb-4`}></div>
                  <div className="text-green-400 text-xs font-semibold tracking-wider uppercase mb-2">
                    {post.category}
                  </div>
                  <h3 className="text-lg font-bold mb-2 group-hover:text-green-400 transition-colors leading-snug">
                    {post.title}
                  </h3>
                  <div className="text-slate-500 text-xs">
                    {post.readTime} • {post.date}
                  </div>
               </div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
}
