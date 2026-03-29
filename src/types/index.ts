export interface Company {
    id: number;
    companyName: string;
    logoUrl?: string;
    location?: string;
}

export interface Job {
    id: number;
    title: string;
    companyId: number;
    company?: Company; // Tham chiếu đến object Company
    location: string;
    salaryMin?: number;
    salaryMax?: number;
    employmentType: string;
    experienceLevel: string;
    description: string;
    requirements: string;
    benefits: string;
    status: string;
    createdAt: string;
    deadline?: string;
}

export interface CandidateProfile {
    id: number;
    fullName: string;
    cvUrl?: string;
    phone?: string;
}

export interface Application {
    id: number;
    jobId: number;
    candidateId: number;
    job?: Job;
    candidate?: CandidateProfile;
    status: string; // NEW, REVIEWING, INTERVIEWING, REJECTED...
    appliedAt: string;
}

export interface Article {
    id: number;
    title: string;
    content: string;
    thumbnailUrl?: string;
    authorId: number;
    author?: {
        email: string;
        fullName?: string;
    };
    createdAt: string;
    updatedAt?: string;
}