/**
 * Property-Based Tests for Project Portfolio Structure
 * Feature: tafara-portfolio
 * Property 5: Project Portfolio Structure
 * Validates: Requirements 4.1, 4.6
 */

import fc from 'fast-check';
import { portfolioData } from '@/data/portfolio';
import { PortfolioData, Project } from '@/types';

describe('Project Portfolio Structure Property Tests', () => {
  /**
   * Property 5: Project Portfolio Structure
   * **Validates: Requirements 4.1, 4.6**
   *
   * For any project display request, the Content_Manager should show exactly
   * four specified projects with their complete technical details and available links.
   */

  describe('Exact Project Count and Specification', () => {
    it('Property 5.1: Content_Manager displays exactly four specified projects', () => {
      fc.assert(
        fc.property(fc.constant(portfolioData), (data: PortfolioData) => {
          // Requirements 4.1: Display exactly four specific projects
          expect(data.projects).toHaveLength(4);

          // Verify the exact four required projects are present
          const expectedProjectIds = [
            'acquisitions-api',
            'voice-to-vector-api',
            'serverless-platform-pattern',
            'legacy-migration',
          ];

          const actualProjectIds = data.projects.map(project => project.id);

          // Each expected project should be present exactly once
          expectedProjectIds.forEach(expectedId => {
            const matchingProjects = data.projects.filter(
              project => project.id === expectedId
            );
            expect(matchingProjects).toHaveLength(1);
          });

          // No additional projects should be present
          expect(actualProjectIds.sort()).toEqual(expectedProjectIds.sort());
        }),
        { numRuns: 10 }
      );
    });

    it('Property 5.2: Each project has complete structural information', () => {
      fc.assert(
        fc.property(fc.constant(portfolioData), (data: PortfolioData) => {
          data.projects.forEach(project => {
            // Each project should have all required structural fields
            expect(project.id).toBeDefined();
            expect(project.title).toBeDefined();
            expect(project.description).toBeDefined();
            expect(project.technologies).toBeDefined();
            expect(project.highlights).toBeDefined();

            // Verify field types and content quality
            expect(typeof project.id).toBe('string');
            expect(project.id.length).toBeGreaterThan(0);

            expect(typeof project.title).toBe('string');
            expect(project.title.length).toBeGreaterThan(5);

            expect(typeof project.description).toBe('string');
            expect(project.description.length).toBeGreaterThan(20);

            expect(Array.isArray(project.technologies)).toBe(true);
            expect(project.technologies.length).toBeGreaterThan(3);

            expect(Array.isArray(project.highlights)).toBe(true);
            expect(project.highlights.length).toBeGreaterThan(3);

            // Verify array contents are meaningful
            project.technologies.forEach(tech => {
              expect(typeof tech).toBe('string');
              expect(tech.length).toBeGreaterThan(0);
              expect(tech.trim()).toBe(tech); // No leading/trailing whitespace
            });

            project.highlights.forEach(highlight => {
              expect(typeof highlight).toBe('string');
              expect(highlight.length).toBeGreaterThan(10);
              expect(highlight.trim()).toBe(highlight); // No leading/trailing whitespace
            });
          });
        }),
        { numRuns: 10 }
      );
    });
  });

  describe('Acquisitions API Project Requirements', () => {
    it('Property 5.3: Acquisitions API project contains all required technical details from Requirements 4.2', () => {
      fc.assert(
        fc.property(fc.constant(portfolioData), (data: PortfolioData) => {
          const acquisitionsProject = data.projects.find(
            project => project.id === 'acquisitions-api'
          );

          expect(acquisitionsProject).toBeDefined();
          expect(acquisitionsProject!.title).toBe(
            'Acquisitions — Platform for Buying & Selling SaaS Businesses'
          );

          const combinedText = `
              ${acquisitionsProject!.description} 
              ${acquisitionsProject!.highlights.join(' ')} 
              ${acquisitionsProject!.technologies.join(' ')}
            `.toLowerCase();

          // Requirements 4.2: JWT authentication, RBAC, Kubernetes deployment,
          // AWS Infrastructure as Code, CI/CD with GitHub Actions, and Monitoring and logging stack
          const requiredDetails = [
            'jwt',
            'rbac',
            'kubernetes',
            'aws',
            'infrastructure as code',
            'ci/cd',
            'github actions',
            'monitoring',
            'logging',
          ];

          requiredDetails.forEach(detail => {
            expect(combinedText).toContain(detail.toLowerCase());
          });

          // Verify substantial technical content
          expect(
            acquisitionsProject!.technologies.length
          ).toBeGreaterThanOrEqual(6);
          expect(acquisitionsProject!.highlights.length).toBeGreaterThanOrEqual(
            5
          );
        }),
        { numRuns: 10 }
      );
    });
  });

  describe('Voice-to-Vector Semantic Memory API Project Requirements', () => {
    it('Property 5.4: Voice-to-Vector API project contains all required technical details from Requirements 4.3', () => {
      fc.assert(
        fc.property(fc.constant(portfolioData), (data: PortfolioData) => {
          const voiceVectorProject = data.projects.find(
            project => project.id === 'voice-to-vector-api'
          );

          expect(voiceVectorProject).toBeDefined();
          expect(voiceVectorProject!.title).toBe(
            'Voice-to-Vector API (Platform Variant)'
          );

          const combinedText = `
              ${voiceVectorProject!.description} 
              ${voiceVectorProject!.highlights.join(' ')} 
              ${voiceVectorProject!.technologies.join(' ')}
            `.toLowerCase();

          // Requirements 4.3: Flask backend, Vector database integration,
          // LLM orchestration, REST API architecture, and Semantic search
          const requiredDetails = [
            'flask',
            'vector database',
            'llm',
            'rest api',
            'semantic',
          ];

          requiredDetails.forEach(detail => {
            expect(combinedText).toContain(detail.toLowerCase());
          });

          // Verify substantial technical content
          expect(
            voiceVectorProject!.technologies.length
          ).toBeGreaterThanOrEqual(5);
          expect(voiceVectorProject!.highlights.length).toBeGreaterThanOrEqual(
            5
          );
        }),
        { numRuns: 10 }
      );
    });
  });

  describe('Serverless Resume Project Requirements', () => {
    it('Property 5.5: Serverless Resume project contains all required technical details from Requirements 4.4', () => {
      fc.assert(
        fc.property(fc.constant(portfolioData), (data: PortfolioData) => {
          const serverlessProject = data.projects.find(
            project => project.id === 'serverless-platform-pattern'
          );

          expect(serverlessProject).toBeDefined();
          expect(serverlessProject!.title).toBe(
            'Serverless App Pattern — IaC & CI/CD Platform'
          );

          const combinedText = `
              ${serverlessProject!.description} 
              ${serverlessProject!.highlights.join(' ')} 
              ${serverlessProject!.technologies.join(' ')}
            `.toLowerCase();

          // Requirements 4.4: AWS Lambda, DynamoDB, API Gateway, Terraform IaC,
          // CloudFront, and CI/CD
          const requiredDetails = [
            'aws lambda',
            'dynamodb',
            'api gateway',
            'terraform',
            'cloudfront',
            'ci/cd',
          ];

          requiredDetails.forEach(detail => {
            expect(combinedText).toContain(detail.toLowerCase());
          });

          // Verify substantial technical content
          expect(serverlessProject!.technologies.length).toBeGreaterThanOrEqual(
            5
          );
          expect(serverlessProject!.highlights.length).toBeGreaterThanOrEqual(
            5
          );
        }),
        { numRuns: 10 }
      );
    });
  });

  describe('Tomcat App Modernization Project Requirements', () => {
    it('Property 5.6: Tomcat Modernization project contains all required technical details from Requirements 4.5', () => {
      fc.assert(
        fc.property(fc.constant(portfolioData), (data: PortfolioData) => {
          const tomcatProject = data.projects.find(
            project => project.id === 'legacy-migration'
          );

          expect(tomcatProject).toBeDefined();
          expect(tomcatProject!.title).toBe(
            'Managed Legacy Migration — Platform Modernization'
          );

          const combinedText = `
              ${tomcatProject!.description} 
              ${tomcatProject!.highlights.join(' ')} 
              ${tomcatProject!.technologies.join(' ')}
            `.toLowerCase();

          // Requirements 4.5: Lift-and-shift strategy, Elastic Beanstalk, RDS,
          // ElastiCache, CloudFront, and Scalability optimization
          const requiredDetails = [
            'lift-and-shift',
            'elastic beanstalk',
            'rds',
            'elasticache',
            'cloudfront',
            'scalability',
          ];

          requiredDetails.forEach(detail => {
            expect(combinedText).toContain(detail.toLowerCase());
          });

          // Verify substantial technical content
          expect(tomcatProject!.technologies.length).toBeGreaterThanOrEqual(5);
          expect(tomcatProject!.highlights.length).toBeGreaterThanOrEqual(5);
        }),
        { numRuns: 10 }
      );
    });
  });

  describe('Project Link Functionality', () => {
    it('Property 5.7: Projects provide available links as specified in Requirements 4.6', () => {
      fc.assert(
        fc.property(fc.constant(portfolioData), (data: PortfolioData) => {
          data.projects.forEach(project => {
            // Requirements 4.6: Provide links to live demos or repositories where available

            // Links are optional; validate structure only when present
            const hasGithubUrl =
              project.githubUrl && project.githubUrl.length > 0;
            const hasDemoUrl = project.demoUrl && project.demoUrl.length > 0;

            // Validate GitHub URLs when present
            if (project.githubUrl) {
              expect(project.githubUrl).toMatch(/^https:\/\/github\.com\//);
              expect(project.githubUrl.length).toBeGreaterThan(20);
            }

            // Validate demo URLs when present
            if (project.demoUrl) {
              expect(project.demoUrl).toMatch(/^https:\/\//);
              expect(project.demoUrl.length).toBeGreaterThan(10);
            }
          });

          // No hard requirements about specific projects having links — links validated above when present
        }),
        { numRuns: 10 }
      );
    });

    it('Property 5.8: Project links maintain proper URL structure and security attributes', () => {
      fc.assert(
        fc.property(fc.constant(portfolioData), (data: PortfolioData) => {
          data.projects.forEach(project => {
            // GitHub URLs should follow proper format
            if (project.githubUrl) {
              expect(project.githubUrl).toMatch(
                /^https:\/\/github\.com\/[\w-]+\/[\w-]+$/
              );
              expect(project.githubUrl).not.toContain(' ');
              expect(project.githubUrl).not.toMatch(/\/$$/); // No trailing slash
            }

            // Demo URLs should be secure HTTPS
            if (project.demoUrl) {
              expect(project.demoUrl).toMatch(/^https:\/\//);
              expect(project.demoUrl).not.toContain(' ');
              expect(project.demoUrl).toMatch(/\.(com|org|net|io|dev|app)/);
            }
          });
        }),
        { numRuns: 10 }
      );
    });
  });

  describe('Project Portfolio Display Structure', () => {
    it('Property 5.9: Project portfolio structure supports Content_Manager display requirements', () => {
      fc.assert(
        fc.property(fc.constant(portfolioData), (data: PortfolioData) => {
          // Should be exactly 4 projects for grid layout (2x2)
          expect(data.projects).toHaveLength(4);

          // Each project should have all required fields for ProjectCard display
          data.projects.forEach(project => {
            // Required for ProjectCard component
            expect(project.id).toBeDefined();
            expect(project.title).toBeDefined();
            expect(project.description).toBeDefined();
            expect(project.technologies).toBeDefined();
            expect(project.highlights).toBeDefined();

            // Title should be suitable for display as a heading
            expect(project.title.length).toBeGreaterThan(5);
            expect(project.title.length).toBeLessThan(80);

            // Description should be suitable for card display
            expect(project.description.length).toBeGreaterThan(30);
            expect(project.description.length).toBeLessThan(300);

            // Technologies should be suitable for tag display
            expect(project.technologies.length).toBeGreaterThan(3);
            expect(project.technologies.length).toBeLessThan(15); // Reasonable for UI

            project.technologies.forEach(tech => {
              expect(tech.length).toBeGreaterThan(1);
              expect(tech.length).toBeLessThan(50); // Fits in UI tags
            });

            // Highlights should be suitable for list display
            expect(project.highlights.length).toBeGreaterThan(3);
            expect(project.highlights.length).toBeLessThan(10); // Reasonable for UI

            project.highlights.forEach(highlight => {
              expect(highlight.length).toBeGreaterThan(10);
              expect(highlight.length).toBeLessThan(150); // Fits in UI
            });
          });

          // Project IDs should be unique and suitable for routing/filtering
          const projectIds = data.projects.map(p => p.id);
          const uniqueIds = new Set(projectIds);
          expect(uniqueIds.size).toBe(4); // All IDs are unique

          // IDs should follow kebab-case pattern
          projectIds.forEach(id => {
            expect(id).toMatch(/^[a-z0-9-]+$/);
            expect(id).not.toMatch(/^-|-$/); // No leading/trailing dashes
          });
        }),
        { numRuns: 10 }
      );
    });

    it('Property 5.10: Project portfolio maintains technical coherence and professional presentation', () => {
      fc.assert(
        fc.property(fc.constant(portfolioData), (data: PortfolioData) => {
          data.projects.forEach(project => {
            // Each project should demonstrate technical depth
            const combinedTechText = `
                ${project.description} 
                ${project.highlights.join(' ')} 
                ${project.technologies.join(' ')}
              `.toLowerCase();

            // Should contain core technical terms relevant to DevOps/Cloud
            const coreTerms = [
              'api',
              'aws',
              'docker',
              'kubernetes',
              'terraform',
              'ci/cd',
            ];
            const hasRelevantTerms = coreTerms.some(term =>
              combinedTechText.includes(term)
            );
            expect(hasRelevantTerms).toBe(true);

            // Technologies should be realistic and current
            project.technologies.forEach(tech => {
              expect(tech).not.toMatch(/^\d+$/); // Not just numbers
              expect(tech).not.toMatch(/^[^a-zA-Z]*$/); // Contains letters
              expect(tech.length).toBeGreaterThan(1);
            });

            // Highlights should describe concrete achievements
            project.highlights.forEach(highlight => {
              expect(highlight).toMatch(/[a-zA-Z]/); // Contains letters
              expect(highlight.split(' ').length).toBeGreaterThan(2); // Multi-word

              // Should not be just a technology name
              expect(highlight.length).toBeGreaterThan(10);
            });

            // Description should be professional and informative
            expect(project.description).toMatch(/[a-zA-Z]/);
            expect(project.description.split(' ').length).toBeGreaterThan(5);
            expect(project.description).not.toMatch(/^[A-Z\s]+$/); // Not all caps
          });

          // Portfolio should cover diverse technical areas
          const allTechnologies = data.projects.flatMap(p => p.technologies);
          const uniqueTechnologies = new Set(
            allTechnologies.map(tech => tech.toLowerCase())
          );
          expect(uniqueTechnologies.size).toBeGreaterThan(15); // Diverse tech stack

          // Should include major technology categories
          const allTechText = Array.from(uniqueTechnologies).join(' ');
          const majorCategories = [
            'javascript',
            'python',
            'java',
            'aws',
            'docker',
            'kubernetes',
          ];
          const representedCategories = majorCategories.filter(
            cat =>
              allTechText.includes(cat) ||
              allTechText.includes(cat.substring(0, 4)) // Partial match
          );
          expect(representedCategories.length).toBeGreaterThan(3);
        }),
        { numRuns: 10 }
      );
    });
  });

  describe('Content_Manager Integration Validation', () => {
    it('Property 5.11: Project portfolio structure supports filtering and search functionality', () => {
      fc.assert(
        fc.property(fc.constant(portfolioData), (data: PortfolioData) => {
          // Projects should have searchable content
          data.projects.forEach(project => {
            const searchableText = `
                ${project.title} 
                ${project.description} 
                ${project.technologies.join(' ')} 
                ${project.highlights.join(' ')}
              `.toLowerCase();

            // Should have substantial searchable content
            expect(searchableText.split(' ').length).toBeGreaterThan(20);

            // Should contain filterable technology keywords
            const filterableTerms = [
              'aws',
              'api',
              'serverless',
              'ai',
              'docker',
              'kubernetes',
            ];
            const hasFilterableTerms = filterableTerms.some(term =>
              searchableText.includes(term)
            );
            expect(hasFilterableTerms).toBe(true);
          });

          // Should support common filter categories
          const allProjectsText = data.projects
            .map(
              p =>
                `${p.title} ${p.description} ${p.technologies.join(' ')} ${p.highlights.join(' ')}`
            )
            .join(' ')
            .toLowerCase();

          // AWS filter category
          expect(allProjectsText).toContain('aws');

          // API filter category
          expect(allProjectsText).toContain('api');

          // AI/ML filter category (for voice-to-vector project)
          const hasAITerms = ['ai', 'llm', 'vector', 'semantic'].some(term =>
            allProjectsText.includes(term)
          );
          expect(hasAITerms).toBe(true);

          // Serverless filter category
          expect(allProjectsText).toContain('serverless');
        }),
        { numRuns: 10 }
      );
    });

    it('Property 5.12: Project portfolio maintains consistency with overall portfolio theme', () => {
      fc.assert(
        fc.property(fc.constant(portfolioData), (data: PortfolioData) => {
          // Projects should align with personal summary keywords
          const personalKeywords = data.personal.summary.toLowerCase();
          const projectsText = data.projects
            .map(
              p =>
                `${p.description} ${p.technologies.join(' ')} ${p.highlights.join(' ')}`
            )
            .join(' ')
            .toLowerCase();

          // Core personal brand keywords that should appear in projects
          // Note: Some keywords like "automation" may be implied through CI/CD, workflows, etc.
          const brandKeywords = [
            'aws',
            'terraform',
            'docker',
            'kubernetes',
            'ci/cd',
          ];
          brandKeywords.forEach(keyword => {
            if (personalKeywords.includes(keyword)) {
              expect(projectsText).toContain(keyword);
            }
          });

          // Check for automation-related concepts even if exact word isn't present
          if (personalKeywords.includes('automation')) {
            const automationConcepts = [
              'ci/cd',
              'pipeline',
              'workflow',
              'orchestration',
              'deployment',
            ];
            const hasAutomationConcepts = automationConcepts.some(concept =>
              projectsText.includes(concept)
            );
            expect(hasAutomationConcepts).toBe(true);
          }

          // Projects should demonstrate capabilities mentioned in capability pillars
          const capabilityKeywords = data.capabilities
            .flatMap(cap => cap.skills.join(' ').toLowerCase().split(' '))
            .filter(keyword => keyword.length > 3); // Filter out short words

          // At least 25% of meaningful capability keywords should appear in projects
          const projectKeywords = projectsText.split(' ');
          const matchingKeywords = capabilityKeywords.filter(keyword =>
            projectKeywords.some(pk => pk.includes(keyword.toLowerCase()))
          );

          expect(matchingKeywords.length).toBeGreaterThan(
            capabilityKeywords.length * 0.25
          );

          // Projects should demonstrate progression and variety
          const projectTitles = data.projects.map(p => p.title);
          expect(new Set(projectTitles).size).toBe(4); // All unique titles

          // Should cover different project types
          const hasAPI = projectTitles.some(title =>
            title.toLowerCase().includes('api')
          );
          const hasInfrastructure = data.projects.some(p =>
            p.technologies.some(tech =>
              ['aws', 'terraform', 'kubernetes', 'docker'].includes(
                tech.toLowerCase()
              )
            )
          );

          expect(hasAPI).toBe(true);
          expect(hasInfrastructure).toBe(true);
        }),
        { numRuns: 10 }
      );
    });
  });
});
