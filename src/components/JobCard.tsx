import { MapPin, Clock, Bookmark, Divide } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface JobCardProps {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  tags: string[];
  postedAt: string;
  compact?: boolean;
}

const JobCard = ({ id, title, company, location, salary, type, tags, postedAt, compact }: JobCardProps) => (
  <div className="group relative rounded-2xl border border-border bg-white p-5 shadow-sm hover:shadow-elevated transition-all duration-300 hover:border-primary">
    {/* Optional Hot Tag */}
    {tags.includes('Hot') && (
      <div className="absolute top-0 right-4 transform -translate-y-1/2">
        <Badge className="bg-destructive text-destructive-foreground hover:bg-destructive border-0 shadow-sm px-2">HOT</Badge>
      </div>
    )}

    <div className="flex items-start justify-between gap-4">
      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-muted/50 border border-border group-hover:bg-white transition-colors overflow-hidden p-2">
        {/* Placeholder Logo (first initial of company) */}
        <span className="text-2xl font-black text-muted-foreground/30">{company.charAt(0)}</span>
      </div>
      
      <div className="min-w-0 flex-1">
        <Link to={`/jobs/${id}`} className="block font-bold text-foreground hover:text-primary transition-colors text-base line-clamp-1 mb-1">
          {title}
        </Link>
        <Link to={`/companies/${id}`} className="text-sm text-muted-foreground hover:underline line-clamp-1">
          {company}
        </Link>
      </div>

      {!compact && (
        <Button variant="ghost" size="icon" className="shrink-0 text-muted-foreground hover:text-accent hover:bg-accent/10">
          <Bookmark className="h-5 w-5" />
        </Button>
      )}
    </div>

    <div className="mt-4 flex flex-wrap gap-y-2 gap-x-4 text-sm">
      <div className="flex items-center gap-1.5 font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-md">
        {salary}
      </div>
      <div className="flex items-center gap-1.5 text-muted-foreground w-full mt-1">
        <MapPin className="h-4 w-4 shrink-0" />
        <span className="line-clamp-1">{location}</span>
      </div>
    </div>

    <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Clock className="h-3.5 w-3.5" />
        <span>{postedAt}</span>
      </div>
      {!compact && (
        <Button size="sm" variant="secondary" className="px-5 font-semibold bg-primary text-white hover:bg-primary/90" asChild>
          <Link to={`/jobs/${id}`}>Ứng tuyển</Link>
        </Button>
      )}
    </div>
  </div>
);

export default JobCard;
