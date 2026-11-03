export interface ProjectImage {
  src: string;
  alt: string;
  label: string;
}
export const projectMedia: Record<string, ProjectImage[]> = {
  'trevis-property-management': [
    {
      src: '/images/work/trevis.jpg',
      alt: 'Trevis finance interface with collection trends and tenant coverage reporting',
      label: 'Finance & coverage',
    },
  ],
  munda: [
    {
      src: '/images/work/munda.jpg',
      alt: 'Munda demo farm dashboard showing farm health, input inventory and decisions',
      label: 'Farm operations',
    },
  ],
  runproduce: [
    {
      src: '/images/work/runproduce.jpg',
      alt: 'RunProduce batch dashboard with flock records, growth and daily actions',
      label: 'Batch operations',
    },
  ],
  iats: [
    {
      src: '/images/work/iats.jpg',
      alt: 'IATS administration interface with organization settings and role-based team access',
      label: 'Administration & access',
    },
  ],
  'litho-solutions': [
    {
      src: '/images/work/litho.jpg',
      alt: 'Litho Solution mineral exploration website with a geological survey hero',
      label: 'Website homepage',
    },
  ],
  'proair-zimbabwe': [
    {
      src: '/images/work/proair.jpg',
      alt: 'ProAir Zimbabwe website for air conditioning and ventilation services',
      label: 'Website homepage',
    },
    {
      src: '/images/work/proair-contact.jpg',
      alt: 'ProAir contact page with WhatsApp access, business hours and map',
      label: 'Contact experience',
    },
  ],
};
