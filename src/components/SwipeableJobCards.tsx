import React, { useState, useRef } from 'react';
import { toast } from 'sonner';

interface Job {
  id: number;
  company: string;
  title: string;
  salary: string;
  jobType: string[];
  location: string;
  skills: string[];
  matchPercentage: number;
  missingSkills: string[];
  upskillLinks: { skill: string; platform: string; url: string }[];
}

const jobData: Job[] = [
  {
    id: 1,
    company: "Accenture",
    title: "Backend Developer",
    salary: "₹12 Lakh",
    jobType: ["Senior", "Full Time"],
    location: "Remote",
    skills: ["JavaScript", "MongoDB", "Node.js", "Azure", "AWS", "Graph QL"],
    matchPercentage: 78,
    missingSkills: ["Docker", "Microservices"],
    upskillLinks: [
      { skill: "Docker", platform: "Coursera", url: "#" },
      { skill: "Microservices", platform: "Udemy", url: "#" }
    ]
  },
  {
    id: 2,
    company: "Google",
    title: "Frontend Developer",
    salary: "₹18 Lakh",
    jobType: ["Mid-level", "Full Time"],
    location: "Bangalore",
    skills: ["React", "TypeScript", "CSS", "Node.js", "Firebase"],
    matchPercentage: 92,
    missingSkills: ["Next.js"],
    upskillLinks: [
      { skill: "Next.js", platform: "Vercel Learn", url: "#" }
    ]
  },
  {
    id: 3,
    company: "Microsoft",
    title: "Full Stack Developer",
    salary: "₹15 Lakh",
    jobType: ["Senior", "Full Time"],
    location: "Hyderabad",
    skills: ["React", "C#", ".NET", "Azure", "SQL Server"],
    matchPercentage: 65,
    missingSkills: ["Entity Framework", "Blazor", "DevOps"],
    upskillLinks: [
      { skill: "Entity Framework", platform: "Microsoft Learn", url: "#" },
      { skill: "Blazor", platform: "Pluralsight", url: "#" },
      { skill: "DevOps", platform: "Azure DevOps", url: "#" }
    ]
  },
  {
    id: 4,
    company: "Amazon",
    title: "DevOps Engineer",
    salary: "₹20 Lakh",
    jobType: ["Senior", "Full Time"],
    location: "Remote",
    skills: ["AWS", "Docker", "Kubernetes", "Python", "Terraform"],
    matchPercentage: 85,
    missingSkills: ["Jenkins", "Ansible"],
    upskillLinks: [
      { skill: "Jenkins", platform: "Jenkins.io", url: "#" },
      { skill: "Ansible", platform: "Red Hat Training", url: "#" }
    ]
  },
  {
    id: 5,
    company: "Wipro",
    title: "Data Scientist",
    salary: "₹14 Lakh",
    jobType: ["Mid-level", "Full Time"],
    location: "Pune",
    skills: ["Python", "Machine Learning", "TensorFlow", "SQL", "R"],
    matchPercentage: 72,
    missingSkills: ["PyTorch", "MLOps", "Spark"],
    upskillLinks: [
      { skill: "PyTorch", platform: "PyTorch.org", url: "#" },
      { skill: "MLOps", platform: "Coursera", url: "#" },
      { skill: "Spark", platform: "Databricks", url: "#" }
    ]
  }
];

interface SwipeableCardProps {
  job: Job;
  onSwipe: (direction: 'left' | 'right' | 'up') => void;
  isTop: boolean;
}

const SwipeableCard: React.FC<SwipeableCardProps> = ({ job, onSwipe, isTop }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleStart = (clientX: number, clientY: number) => {
    if (!isTop) return;
    setIsDragging(true);
    setStartPos({ x: clientX, y: clientY });
  };

  const handleMove = (clientX: number, clientY: number) => {
    if (!isDragging || !isTop) return;
    
    const deltaX = clientX - startPos.x;
    const deltaY = clientY - startPos.y;
    setDragOffset({ x: deltaX, y: deltaY });
  };

  const handleEnd = () => {
    if (!isDragging || !isTop) return;
    
    const threshold = 100;
    const { x, y } = dragOffset;
    
    if (Math.abs(x) > threshold || Math.abs(y) > threshold) {
      if (Math.abs(y) > Math.abs(x) && y < -threshold) {
        onSwipe('up');
      } else if (x > threshold) {
        onSwipe('right');
      } else if (x < -threshold) {
        onSwipe('left');
      }
    }
    
    setIsDragging(false);
    setDragOffset({ x: 0, y: 0 });
  };

  const getRotation = () => {
    return dragOffset.x * 0.1;
  };

  const getSwipeIndicator = () => {
    const { x, y } = dragOffset;
    if (Math.abs(y) > Math.abs(x) && y < -50) return 'APPLY';
    if (x > 50) return 'SAVE';
    if (x < -50) return 'REJECT';
    return '';
  };

  const getIndicatorColor = () => {
    const indicator = getSwipeIndicator();
    switch (indicator) {
      case 'APPLY': return 'text-primary';
      case 'SAVE': return 'text-accent';
      case 'REJECT': return 'text-destructive';
      default: return '';
    }
  };

  return (
    <div
      ref={cardRef}
      className={`absolute w-80 h-[520px] glass-effect rounded-3xl neon-border cursor-grab active:cursor-grabbing transition-all duration-500 ease-out hover-glow ${
        isTop ? 'z-10' : 'z-0'
      }`}
      style={{
        transform: `translate(${dragOffset.x}px, ${dragOffset.y}px) rotate(${getRotation()}deg) scale(${isTop ? 1 : 0.95})`,
        opacity: isTop ? 1 : 0.8,
        transition: isDragging ? 'none' : 'all 0.5s cubic-bezier(0.4, 0.0, 0.2, 1)',
      }}
      onMouseDown={(e) => handleStart(e.clientX, e.clientY)}
      onMouseMove={(e) => handleMove(e.clientX, e.clientY)}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
      onTouchStart={(e) => handleStart(e.touches[0].clientX, e.touches[0].clientY)}
      onTouchMove={(e) => handleMove(e.touches[0].clientX, e.touches[0].clientY)}
      onTouchEnd={handleEnd}
    >
      {/* Swipe Indicator */}
      {getSwipeIndicator() && (
        <div className={`absolute top-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-lg border-2 border-dashed font-bold text-lg ${getIndicatorColor()} glass-effect neon-border`}>
          {getSwipeIndicator()}
        </div>
      )}

      <div className="p-6 h-full flex flex-col">
        {/* Match Percentage */}
        <div className="text-center mb-4">
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold ${
            job.matchPercentage >= 70 
              ? 'bg-green-500/20 text-green-400 border border-green-500/50' 
              : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/50'
          }`}>
            <div className={`w-2 h-2 rounded-full ${job.matchPercentage >= 70 ? 'bg-green-400' : 'bg-yellow-400'} pulse-glow`}></div>
            {job.matchPercentage}% Match
          </div>
        </div>

        {/* Company Name */}
        <div className="text-center mb-4">
          <h2 className="text-3xl font-bold text-gradient-primary mb-2">{job.company}</h2>
          <h3 className="text-xl font-semibold text-foreground">{job.title}</h3>
        </div>

        {/* Salary */}
        <div className="text-center mb-6">
          <p className="text-muted-foreground mb-2">Salary per annum</p>
          <div className="bg-gradient-to-r from-primary to-accent text-primary-foreground px-6 py-3 rounded-xl font-bold text-lg inline-block neon-border pulse-glow">
            {job.salary}
          </div>
        </div>

        {/* Job Type */}
        <div className="mb-4">
          <p className="text-muted-foreground text-center mb-2">Job type</p>
          <div className="flex justify-center gap-2">
            {job.jobType.map((type, index) => (
              <span key={index} className="bg-secondary text-secondary-foreground px-3 py-1 rounded-lg text-sm border border-border">
                {type}
              </span>
            ))}
          </div>
        </div>

        {/* Work Location */}
        <div className="mb-4">
          <p className="text-muted-foreground text-center mb-2">Work Location</p>
          <div className="flex justify-center">
            <span className="bg-secondary text-secondary-foreground px-3 py-1 rounded-lg text-sm border border-border">
              {job.location}
            </span>
          </div>
        </div>

        {/* Skills */}
        <div className="overflow-hidden mb-4">
          <p className="text-muted-foreground text-center mb-3">Skills Required</p>
          <div className="flex flex-wrap gap-2 justify-center max-h-20 overflow-y-auto scrollbar-hide px-2">
            {job.skills.map((skill, index) => (
              <span key={index} className="bg-muted text-muted-foreground px-3 py-1 rounded-lg text-sm border border-border hover-glow whitespace-nowrap flex-shrink-0">
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Missing Skills & Upskilling */}
        {job.missingSkills.length > 0 && (
          <div className="mt-auto">
            <p className="text-muted-foreground text-center mb-2 text-sm">Skills to Upskill</p>
            <div className="flex flex-wrap gap-1 justify-center mb-3">
              {job.missingSkills.map((skill, index) => (
                <span key={index} className="bg-destructive/20 text-destructive px-2 py-1 rounded text-xs border border-destructive/50">
                  {skill}
                </span>
              ))}
            </div>
            <div className="text-center">
              <div className={`text-xs px-3 py-2 rounded-lg ${
                job.matchPercentage >= 70 
                  ? 'bg-green-500/10 text-green-400 border border-green-500/30' 
                  : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/30'
              }`}>
                {job.matchPercentage >= 70 
                  ? '✅ CV will be optimized for this role' 
                  : '⚠️ Upskill to 70%+ for CV optimization'}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const SwipeableJobCards: React.FC = () => {
  const [currentJobs, setCurrentJobs] = useState(jobData);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSwipe = (direction: 'left' | 'right' | 'up') => {
    const currentJob = currentJobs[currentIndex];
    
    switch (direction) {
      case 'left':
        toast.error(`Rejected ${currentJob.company} - ${currentJob.title} (${currentJob.matchPercentage}% match)`);
        break;
      case 'right':
        toast.success(`Saved ${currentJob.company} - ${currentJob.title} (${currentJob.matchPercentage}% match)`);
        break;
      case 'up':
        if (currentJob.matchPercentage >= 70) {
          toast.info(`Applied to ${currentJob.company} - ${currentJob.title}! CV optimized for this role. Upskill recommendations sent via email.`);
        } else {
          toast.warning(`Applied to ${currentJob.company} - ${currentJob.title}! Consider upskilling to improve match percentage.`);
        }
        break;
    }

    setCurrentIndex(prev => prev + 1);
  };

  const resetCards = () => {
    setCurrentIndex(0);
    toast.info("Cards reset! Start swiping again.");
  };

  const visibleJobs = currentJobs.slice(currentIndex, currentIndex + 3);

  return (
    <section className="py-20 px-6 lightning-bg">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl sm:text-5xl font-bold text-hero mb-4">
          Tinder-Style Job Matching
        </h2>
        <p className="text-xl text-subtitle mb-8">
          Swipe through jobs and find your perfect match
        </p>
        
        {/* Instructions */}
        <div className="flex justify-center gap-6 mb-12 text-sm">
          <div className="flex items-center gap-2 glass-effect p-3 rounded-lg neon-border">
            <div className="w-4 h-4 bg-destructive rounded pulse-glow"></div>
            <span className="text-foreground">← Swipe Left to Reject</span>
          </div>
          <div className="flex items-center gap-2 glass-effect p-3 rounded-lg neon-border">
            <div className="w-4 h-4 bg-accent rounded pulse-glow"></div>
            <span className="text-foreground">Swipe Right to Save →</span>
          </div>
          <div className="flex items-center gap-2 glass-effect p-3 rounded-lg neon-border">
            <div className="w-4 h-4 bg-primary rounded pulse-glow"></div>
            <span className="text-foreground">↑ Swipe Up to Apply</span>
          </div>
        </div>

        {/* Card Stack */}
        <div className="relative h-[540px] flex justify-center items-center mb-8">
          {currentIndex >= currentJobs.length ? (
            <div className="text-center glass-effect p-8 rounded-2xl neon-border">
              <h3 className="text-2xl font-bold text-foreground mb-4">No more jobs!</h3>
              <button
                onClick={resetCards}
                className="bg-gradient-to-r from-primary to-accent text-primary-foreground px-6 py-3 rounded-xl font-semibold hover-glow neon-border transition-all duration-300"
              >
                Reset Cards
              </button>
            </div>
          ) : (
            visibleJobs.map((job, index) => (
              <SwipeableCard
                key={`${job.id}-${currentIndex}`}
                job={job}
                onSwipe={handleSwipe}
                isTop={index === 0}
              />
            ))
          )}
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-center items-center gap-2 glass-effect p-4 rounded-lg neon-border">
          <span className="text-muted-foreground">Progress:</span>
          <div className="flex gap-1">
            {currentJobs.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index < currentIndex ? 'bg-primary pulse-glow' : 'bg-muted'
                }`}
              />
            ))}
          </div>
          <span className="text-muted-foreground ml-2">
            {currentIndex}/{currentJobs.length}
          </span>
        </div>
      </div>
    </section>
  );
};

export default SwipeableJobCards;