export interface OverviewFormData {
    department: string;
    location: string;
    projectName: string;
    description: string;
    searchTerm: string;
    isSubmitted: boolean;
  }
  
  export interface RootState {
    overview: OverviewFormData;
  }