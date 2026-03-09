import { MapPin, Clock, Banknote, Bookmark, Building2 } from 'lucide-react';
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
  <div className="group rounded-xl border border-border bg-card p-5 shadow-card hover:shadow-elevated transition-all duration-300 hover:border-primary/30">
    <div className="flex items-start justify-between gap-3">
      <div className="flex gap-4 flex-1 min-w-0">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-muted">
          <Building2 className="h-6 w-6 text-muted-foreground" />
        </div>
        <div className="min-w-0 flex-1">
          <Link to={`/jobs/${id}`} className="font-semibold text-foreground hover:text-primary transition-colors line-clamp-1">
            {title}
          </Link>
          <p className="text-sm text-muted-foreground mt-0.5">{company}</p>
        </div>
      </div>
      {!compact && (
        <Button variant="ghost" size="icon" className="shrink-0 text-muted-foreground hover:text-accent">
          <Bookmark className="h-4 w-4" />
        </Button>
      )}
    </div>

    <div className="mt-3 flex flex-wrap gap-3 text-sm text-muted-foreground">
      <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{location}</span>
      <span className="flex items-center gap-1"><Banknote className="h-3.5 w-3.5" />{salary}</span>
      <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{postedAt}</span>
    </div>

    <div className="mt-3 flex flex-wrap gap-2">
      <Badge variant="secondary" className="text-xs">{type}</Badge>
      {tags.map((tag) => (
        <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
      ))}
    </div>
  </div>
);

export default JobCard;
