import LeadLayoutNew from './LeadLayoutNew';

interface LeadLayoutProps {
  children?: React.ReactNode;
}

export default function LeadLayout({ children }: LeadLayoutProps) {
  return <LeadLayoutNew>{children}</LeadLayoutNew>;
}