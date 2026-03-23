/**
 * Property-Based Tests for Documentation Completeness
 * Feature: tafara-portfolio
 * Property 12: Documentation Completeness
 * Validates: Requirements 9.5
 */

import fc from 'fast-check';
import fs from 'fs';
import path from 'path';

describe('Documentation Completeness Property Tests', () => {
  const projectRoot = path.resolve(__dirname, '../../..');

  /**
   * Property 12: Documentation Completeness
   * **Validates: Requirements 9.5**
   * 
   * For any project setup request, the Portfolio_System should include comprehensive 
   * README documentation with setup and deployment instructions.
   */
  
  /**
   * Property 12.1: README.md exists and contains comprehensive project information
   */
  it('Property 12.1: README.md exists and contains comprehensive project information', () => {
    const readmePath = path.join(projectRoot, 'README.md');
    expect(fs.existsSync(readmePath)).toBe(true);
    
    const readmeContent = fs.readFileSync(readmePath, 'utf8');
    
    // Essential sections that must be present in README
    const requiredSections = [
      'Features',
      'Technology Stack',
      'Getting Started',
      'Development',
      'Deployment',
      'Testing',
      'Project Structure'
    ];
    
    requiredSections.forEach(section => {
      const sectionRegex = new RegExp(`#{1,3}\\s*.*${section}`, 'i');
      expect(readmeContent).toMatch(sectionRegex);
    });
    
    // Should contain project title and description
    expect(readmeContent).toContain('Tafara Rugara Portfolio');
    expect(readmeContent).toMatch(/portfolio.*website/i);
    
    // Should contain technology stack information
    expect(readmeContent).toContain('Next.js');
    expect(readmeContent).toContain('TypeScript');
    expect(readmeContent).toContain('Tailwind CSS');
    expect(readmeContent).toContain('Framer Motion');
  });

  /**
   * Property 12.2: Setup instructions are comprehensive and actionable
   */
  it('Property 12.2: setup instructions are comprehensive and actionable', () => {
    const readmePath = path.join(projectRoot, 'README.md');
    const readmeContent = fs.readFileSync(readmePath, 'utf8');
    
    // Property test: Setup instructions should be present for different scenarios
    fc.assert(
      fc.property(
        fc.constantFrom(
          'Prerequisites',
          'Quick Start',
          'Installation',
          'Getting Started',
          'Development'
        ),
        (setupSection) => {
          const sectionRegex = new RegExp(`#{1,3}\\s*.*${setupSection}`, 'i');
          expect(readmeContent).toMatch(sectionRegex);
        }
      ),
      { numRuns: 5 }
    );
    
    // Should contain essential setup commands
    const essentialCommands = [
      'npm install',
      'npm run dev',
      'npm run build'
    ];
    
    essentialCommands.forEach(command => {
      expect(readmeContent).toContain(command);
    });
    
    // Should contain prerequisites
    expect(readmeContent).toMatch(/node\.?js.*1[8-9]/i); // Node.js 18+
    expect(readmeContent).toMatch(/npm|yarn/i);
    
    // Should contain development server instructions
    expect(readmeContent).toMatch(/localhost:3000|http:\/\/localhost:3000/);
  });

  /**
   * Property 12.3: Deployment instructions are detailed and platform-specific
   */
  it('Property 12.3: deployment instructions are detailed and platform-specific', () => {
    const readmePath = path.join(projectRoot, 'README.md');
    const readmeContent = fs.readFileSync(readmePath, 'utf8');
    
    // Should contain deployment section
    expect(readmeContent).toMatch(/#{1,3}.*deployment/i);
    
    // Should mention Netlify (the target deployment platform)
    expect(readmeContent).toContain('Netlify');
    
    // Should contain deployment-related commands or instructions
    const deploymentKeywords = [
      'deploy',
      'build',
      'production',
      'environment'
    ];
    
    deploymentKeywords.forEach(keyword => {
      const keywordRegex = new RegExp(keyword, 'i');
      expect(readmeContent).toMatch(keywordRegex);
    });
    
    // Should reference deployment configuration
    expect(readmeContent).toMatch(/netlify\.toml|deployment.*config/i);
  });

  /**
   * Property 12.4: Supporting documentation files exist and are comprehensive
   */
  it('Property 12.4: supporting documentation files exist and are comprehensive', () => {
    // Property test: All required documentation files should exist
    fc.assert(
      fc.property(
        fc.constantFrom(
          'DEPLOYMENT.md',
          'DEVELOPMENT.md', 
          'ARCHITECTURE.md',
          'TESTING.md'
        ),
        (docFile) => {
          const docPath = path.join(projectRoot, docFile);
          expect(fs.existsSync(docPath)).toBe(true);
          
          const docContent = fs.readFileSync(docPath, 'utf8');
          
          // Each documentation file should be substantial (not empty)
          expect(docContent.length).toBeGreaterThan(1000);
          
          // Should contain proper markdown structure
          expect(docContent).toMatch(/^#\s+/m); // Should have at least one main heading
          expect(docContent).toMatch(/#{2,3}\s+/m); // Should have subheadings
          
          // File-specific content validation
          switch (docFile) {
            case 'DEPLOYMENT.md':
              expect(docContent).toMatch(/deploy|netlify|production/i);
              expect(docContent).toContain('npm run build');
              break;
            case 'DEVELOPMENT.md':
              expect(docContent).toMatch(/development|workflow|coding/i);
              expect(docContent).toMatch(/npm.*dev|yarn.*dev/);
              break;
            case 'ARCHITECTURE.md':
              expect(docContent).toMatch(/architecture|component|structure/i);
              expect(docContent).toContain('Next.js');
              break;
            case 'TESTING.md':
              expect(docContent).toMatch(/test|jest|playwright/i);
              expect(docContent).toContain('npm test');
              break;
          }
        }
      ),
      { numRuns: 4 }
    );
  });

  /**
   * Property 12.5: Documentation includes project structure and file organization
   */
  it('Property 12.5: documentation includes project structure and file organization', () => {
    const readmePath = path.join(projectRoot, 'README.md');
    const readmeContent = fs.readFileSync(readmePath, 'utf8');
    
    // Should contain project structure section
    expect(readmeContent).toMatch(/#{1,3}.*(?:project.*structure|file.*structure|directory)/i);
    
    // Should document key directories
    const keyDirectories = [
      'src/',
      'src/app/',
      'src/components/',
      'public/',
      'e2e/'
    ];
    
    keyDirectories.forEach(dir => {
      expect(readmeContent).toContain(dir);
    });
    
    // Should explain the purpose of key directories
    expect(readmeContent).toMatch(/app.*router|next\.js.*app/i);
    expect(readmeContent).toMatch(/components.*reusable/i);
    expect(readmeContent).toMatch(/public.*static|static.*assets/i);
  });

  /**
   * Property 12.6: Documentation includes testing and quality assurance information
   */
  it('Property 12.6: documentation includes testing and quality assurance information', () => {
    const readmePath = path.join(projectRoot, 'README.md');
    const readmeContent = fs.readFileSync(readmePath, 'utf8');
    
    // Should contain testing section
    expect(readmeContent).toMatch(/#{1,3}.*test/i);
    
    // Should document testing commands
    const testingCommands = [
      'npm test',
      'npm run test',
      'test:e2e',
      'test:coverage'
    ];
    
    const hasTestingCommands = testingCommands.some(command => 
      readmeContent.includes(command)
    );
    expect(hasTestingCommands).toBe(true);
    
    // Should mention testing frameworks
    const testingFrameworks = [
      'Jest',
      'Playwright',
      'React Testing Library'
    ];
    
    const hasTestingFrameworks = testingFrameworks.some(framework =>
      readmeContent.includes(framework)
    );
    expect(hasTestingFrameworks).toBe(true);
  });

  /**
   * Property 12.7: Documentation includes performance and quality metrics
   */
  it('Property 12.7: documentation includes performance and quality metrics', () => {
    const readmePath = path.join(projectRoot, 'README.md');
    const readmeContent = fs.readFileSync(readmePath, 'utf8');
    
    // Should mention performance targets or metrics
    const performanceKeywords = [
      'performance',
      'lighthouse',
      'speed',
      'optimization',
      'metrics'
    ];
    
    const hasPerformanceInfo = performanceKeywords.some(keyword =>
      readmeContent.toLowerCase().includes(keyword)
    );
    expect(hasPerformanceInfo).toBe(true);
    
    // Should mention quality standards
    const qualityKeywords = [
      'quality',
      'standards',
      'best practices',
      'accessibility',
      'SEO'
    ];
    
    const hasQualityInfo = qualityKeywords.some(keyword =>
      readmeContent.toLowerCase().includes(keyword)
    );
    expect(hasQualityInfo).toBe(true);
  });

  /**
   * Property 12.8: Documentation is well-structured with proper markdown formatting
   */
  it('Property 12.8: documentation is well-structured with proper markdown formatting', () => {
    // Property test: All documentation files should have proper markdown structure
    fc.assert(
      fc.property(
        fc.constantFrom(
          'README.md',
          'DEPLOYMENT.md',
          'DEVELOPMENT.md',
          'ARCHITECTURE.md',
          'TESTING.md'
        ),
        (docFile) => {
          const docPath = path.join(projectRoot, docFile);
          const docContent = fs.readFileSync(docPath, 'utf8');
          
          // Should have proper heading hierarchy
          expect(docContent).toMatch(/^#\s+[^\n]+/m); // Main title
          expect(docContent).toMatch(/^#{2,3}\s+[^\n]+/m); // Subsections
          
          // Should use proper markdown formatting
          expect(docContent).toMatch(/```[\s\S]*?```/); // Code blocks
          expect(docContent).toMatch(/`[^`]+`/); // Inline code
          
          // Should have proper list formatting
          expect(docContent).toMatch(/^[-*+]\s+/m); // Unordered lists
          
          // Should not have broken markdown links
          const brokenLinks = docContent.match(/\[([^\]]+)\]\(\s*\)/g);
          expect(brokenLinks).toBeNull();
          
          // Should have consistent heading style (ATX style preferred)
          const underlineHeadings = docContent.match(/^.+\n[=-]+$/gm);
          if (underlineHeadings) {
            // If underline headings exist, they should be minimal
            expect(underlineHeadings.length).toBeLessThan(3);
          }
        }
      ),
      { numRuns: 5 }
    );
  });

  /**
   * Property 12.9: Documentation includes troubleshooting and maintenance information
   */
  it('Property 12.9: documentation includes troubleshooting and maintenance information', () => {
    // Check if troubleshooting information exists in README or separate file
    const readmePath = path.join(projectRoot, 'README.md');
    const troubleshootingPath = path.join(projectRoot, 'TROUBLESHOOTING.md');
    
    const readmeContent = fs.readFileSync(readmePath, 'utf8');
    
    // Should have troubleshooting information either in README or separate file
    const hasTroubleshootingInReadme = /troubleshoot|common.*issues?|problems?/i.test(readmeContent);
    const hasTroubleshootingFile = fs.existsSync(troubleshootingPath);
    
    expect(hasTroubleshootingInReadme || hasTroubleshootingFile).toBe(true);
    
    // Should mention maintenance or updates
    const maintenanceKeywords = [
      'maintenance',
      'update',
      'upgrade',
      'dependencies'
    ];
    
    const hasMaintenanceInfo = maintenanceKeywords.some(keyword =>
      readmeContent.toLowerCase().includes(keyword)
    );
    expect(hasMaintenanceInfo).toBe(true);
  });

  /**
   * Property 12.10: Documentation includes contribution and contact information
   */
  it('Property 12.10: documentation includes contribution and contact information', () => {
    const readmePath = path.join(projectRoot, 'README.md');
    const readmeContent = fs.readFileSync(readmePath, 'utf8');
    
    // Should include author information
    expect(readmeContent).toContain('Tafara Rugara');
    
    // Should include contact or social links
    const contactKeywords = [
      'github',
      'linkedin',
      'email',
      'contact'
    ];
    
    const hasContactInfo = contactKeywords.some(keyword =>
      readmeContent.toLowerCase().includes(keyword)
    );
    expect(hasContactInfo).toBe(true);
    
    // Should include license information
    expect(readmeContent).toMatch(/license|mit/i);
    
    // Should mention how to contribute or report issues
    const contributionKeywords = [
      'contribut',
      'issues',
      'pull request',
      'feedback'
    ];
    
    const hasContributionInfo = contributionKeywords.some(keyword =>
      readmeContent.toLowerCase().includes(keyword)
    );
    expect(hasContributionInfo).toBe(true);
  });
});