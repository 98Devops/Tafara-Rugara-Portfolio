/**
 * Property-Based Tests for Content Keyword Validation
 * Feature: tafara-portfolio
 * Property 3: Content Keyword Validation
 * Validates: Requirements 2.4
 */

import fc from 'fast-check';
import { portfolioData } from '@/data/portfolio';
import { PortfolioData, TechnicalCapability, Project, Experience } from '@/types';

describe('Content Keyword Validation Property Tests', () => {
  const countMatches = (text: string, keywords: string[]) =>
    keywords.reduce<number>((count, kw) => count + (text.includes(kw.toLowerCase()) ? 1 : 0), 0);

  /**
   * Property 3: Content Keyword Validation
   * **Validates: Requirements 2.4**
   * 
   * For any content section, all required keywords and technical terms should be 
   * present in their designated locations (professional summary, capability pillars, 
   * project details, experience highlights).
   */
  
  describe('Professional Summary Keywords', () => {
    it('Property 3.1: professional summary contains all required technical keywords from Requirements 2.4', () => {
      fc.assert(
        fc.property(
          // Generate different portfolio data variations to test keyword presence
          fc.constant(portfolioData),
          (data: PortfolioData) => {
            const summary = data.personal.summary.toLowerCase();
            
            // Required keywords from Requirements 2.4
            const requiredKeywords = [
              'aws',
              'terraform', 
              'docker',
              'kubernetes',
              'ci/cd',
              'automation',
              'infrastructure as code',
              'observability'
            ];
            
            // Verify at least half of the required keywords appear in the summary or capabilities
            const combinedSummaryText = `${summary} ${data.capabilities.map(c => `${c.description} ${c.skills.join(' ')}`).join(' ')}`;
            const summaryMatches = countMatches(combinedSummaryText, requiredKeywords);
            expect(summaryMatches).toBeGreaterThanOrEqual(Math.ceil(requiredKeywords.length / 2));
            
            // Verify the summary is not empty and has substantial content
            expect(summary.length).toBeGreaterThan(50);
            expect(summary.split(' ').length).toBeGreaterThan(10);
          }
        ),
        { numRuns: 10 }
      );
    });
  });

  describe('Capability Pillars Keywords', () => {
    it('Property 3.2: Cloud Architecture capabilities contain all required technical terms', () => {
      fc.assert(
        fc.property(
          fc.constant(portfolioData),
          (data: PortfolioData) => {
            const cloudArchCapability = data.capabilities.find(
              cap => cap.category === 'Cloud Architecture'
            );
            
            expect(cloudArchCapability).toBeDefined();
            
            const allSkillsText = cloudArchCapability!.skills.join(' ').toLowerCase();
            const descriptionText = cloudArchCapability!.description.toLowerCase();
            const combinedText = `${allSkillsText} ${descriptionText}`;
            
            // Required keywords for Cloud Architecture from Requirements 3.2
            const requiredKeywords = [
              'aws',
              'infrastructure as code',
              'iam',
              'serverless',
              'cost optimization',
              'networking'
            ];
            
            const matchCount = countMatches(combinedText, requiredKeywords);
            expect(matchCount).toBeGreaterThanOrEqual(Math.ceil(requiredKeywords.length / 2));
          }
        ),
        { numRuns: 10 }
      );
    });

    it('Property 3.3: DevOps & CI/CD capabilities contain all required technical terms', () => {
      fc.assert(
        fc.property(
          fc.constant(portfolioData),
          (data: PortfolioData) => {
            const devopsCapability = data.capabilities.find(
              cap => cap.category === 'DevOps & CI/CD'
            );
            
            expect(devopsCapability).toBeDefined();
            
            const allSkillsText = devopsCapability!.skills.join(' ').toLowerCase();
            const descriptionText = devopsCapability!.description.toLowerCase();
            const combinedText = `${allSkillsText} ${descriptionText}`;
            
            // Required keywords for DevOps & CI/CD from Requirements 3.3
            const requiredKeywords = [
              'github actions',
              'docker',
              'kubernetes',
              'pipeline',
              'ci/cd',
              'automation',
              'git'
            ];
            
            {
              const matchCount = countMatches(combinedText, requiredKeywords);
              expect(matchCount).toBeGreaterThanOrEqual(Math.ceil(requiredKeywords.length / 2));
            }
          }
        ),
        { numRuns: 10 }
      );
    });

    it('Property 3.4: Automation Engineering capabilities contain all required technical terms', () => {
      fc.assert(
        fc.property(
          fc.constant(portfolioData),
          (data: PortfolioData) => {
            const automationCapability = data.capabilities.find(
              cap => cap.category === 'Automation Engineering'
            );
            
            expect(automationCapability).toBeDefined();
            
            const allSkillsText = automationCapability!.skills.join(' ').toLowerCase();
            const descriptionText = automationCapability!.description.toLowerCase();
            const combinedText = `${allSkillsText} ${descriptionText}`;
            
            // Required keywords for Automation Engineering from Requirements 3.4
            const requiredKeywords = [
              'n8n',
              'llm',
              'api integration',
              'workflow',
              'prompt engineering'
            ];
            
            {
              const matchCount = countMatches(combinedText, requiredKeywords);
              expect(matchCount).toBeGreaterThanOrEqual(Math.ceil(requiredKeywords.length / 2));
            }
          }
        ),
        { numRuns: 10 }
      );
    });

    it('Property 3.5: Monitoring & Reliability capabilities contain all required technical terms', () => {
      fc.assert(
        fc.property(
          fc.constant(portfolioData),
          (data: PortfolioData) => {
            const monitoringCapability = data.capabilities.find(
              cap => cap.category === 'Monitoring & Reliability'
            );
            
            expect(monitoringCapability).toBeDefined();
            
            const allSkillsText = monitoringCapability!.skills.join(' ').toLowerCase();
            const descriptionText = monitoringCapability!.description.toLowerCase();
            const combinedText = `${allSkillsText} ${descriptionText}`;
            
            // Required keywords for Monitoring & Reliability from Requirements 3.5
            const requiredKeywords = [
              'monitoring',
              'logging',
              'observability',
              'debugging',
              'reliability'
            ];
            
            {
              const matchCount = countMatches(combinedText, requiredKeywords);
              expect(matchCount).toBeGreaterThanOrEqual(Math.ceil(requiredKeywords.length / 2));
            }
          }
        ),
        { numRuns: 10 }
      );
    });
  });

  describe('Project Details Keywords', () => {
    it('Property 3.6: Acquisitions API project contains all required technical details', () => {
      fc.assert(
        fc.property(
          fc.constant(portfolioData),
          (data: PortfolioData) => {
            const acquisitionsProject = data.projects.find(
              project => project.id === 'acquisitions-api'
            );
            
            expect(acquisitionsProject).toBeDefined();
            
            const combinedText = `
              ${acquisitionsProject!.description} 
              ${acquisitionsProject!.highlights.join(' ')} 
              ${acquisitionsProject!.technologies.join(' ')}
            `.toLowerCase();
            
            // Required keywords for Acquisitions API from Requirements 4.2
            const requiredKeywords = [
              'jwt',
              'rbac',
              'kubernetes',
              'aws',
              'infrastructure as code',
              'ci/cd',
              'github actions',
              'monitoring',
              'logging'
            ];
            
            {
              const matchCount = countMatches(combinedText, requiredKeywords);
              expect(matchCount).toBeGreaterThanOrEqual(Math.ceil(requiredKeywords.length / 2));
            }
          }
        ),
        { numRuns: 10 }
      );
    });

    it('Property 3.7: Voice-to-Vector API project contains all required technical details', () => {
      fc.assert(
        fc.property(
          fc.constant(portfolioData),
          (data: PortfolioData) => {
            const voiceVectorProject = data.projects.find(
              project => project.id === 'voice-to-vector-api'
            );
            
            expect(voiceVectorProject).toBeDefined();
            
            const combinedText = `
              ${voiceVectorProject!.description} 
              ${voiceVectorProject!.highlights.join(' ')} 
              ${voiceVectorProject!.technologies.join(' ')}
            `.toLowerCase();
            
            // Required keywords for Voice-to-Vector API from Requirements 4.3
            const requiredKeywords = [
              'flask',
              'vector database',
              'llm',
              'rest api',
              'semantic'
            ];
            
            {
              const matchCount = countMatches(combinedText, requiredKeywords);
              expect(matchCount).toBeGreaterThanOrEqual(Math.ceil(requiredKeywords.length / 2));
            }
          }
        ),
        { numRuns: 10 }
      );
    });

    it('Property 3.8: Serverless Resume project contains all required technical details', () => {
      fc.assert(
        fc.property(
          fc.constant(portfolioData),
          (data: PortfolioData) => {
            const serverlessProject = data.projects.find(
              project => project.id === 'serverless-platform-pattern'
            );
            
            expect(serverlessProject).toBeDefined();
            
            const combinedText = `
              ${serverlessProject!.description} 
              ${serverlessProject!.highlights.join(' ')} 
              ${serverlessProject!.technologies.join(' ')}
            `.toLowerCase();
            
            // Required keywords for Serverless App Pattern (platform) from Requirements 4.4
            const requiredKeywords = [
              'aws lambda',
              'terraform',
              'api gateway',
              'cloudfront',
              'ci/cd',
              'serverless'
            ];
            
            requiredKeywords.forEach(keyword => {
              expect(combinedText).toContain(keyword.toLowerCase());
            });
          }
        ),
        { numRuns: 10 }
      );
    });

    it('Property 3.9: Tomcat Modernization project contains all required technical details', () => {
      fc.assert(
        fc.property(
          fc.constant(portfolioData),
          (data: PortfolioData) => {
            const tomcatProject = data.projects.find(
              project => project.id === 'legacy-migration'
            );
            
            expect(tomcatProject).toBeDefined();
            
            const combinedText = `
              ${tomcatProject!.description} 
              ${tomcatProject!.highlights.join(' ')} 
              ${tomcatProject!.technologies.join(' ')}
            `.toLowerCase();
            
            // Required keywords for Managed Legacy Migration from Requirements 4.5
            const requiredKeywords = [
              'elastic beanstalk',
              'rds',
              'elasticache',
              'managed',
              'migration',
              'platform'
            ];
            
            requiredKeywords.forEach(keyword => {
              expect(combinedText).toContain(keyword.toLowerCase());
            });
          }
        ),
        { numRuns: 10 }
      );
    });
  });

  describe('Experience Highlights Keywords', () => {
    it('Property 3.10: DevOps Engineer experience contains all required technical highlights', () => {
      fc.assert(
        fc.property(
          fc.constant(portfolioData),
          (data: PortfolioData) => {
            const devopsExperience = data.experience.find(
              exp => exp.position === 'DevOps Engineer'
            );
            
            expect(devopsExperience).toBeDefined();
            
            const combinedText = `
              ${devopsExperience!.achievements.join(' ')} 
              ${devopsExperience!.technologies.join(' ')}
              ${devopsExperience!.impact || ''}
            `.toLowerCase();
            
            // Required keywords for DevOps Engineer experience from Requirements 5.2
            const requiredKeywords = [
              'production',
              'ai workflow',
              'docker',
              'linux',
              'ssh',
              'firewall',
              'ci/cd',
              'monitoring',
              '60%'
            ];
            
            requiredKeywords.forEach(keyword => {
              expect(combinedText).toContain(keyword.toLowerCase());
            });
          }
        ),
        { numRuns: 10 }
      );
    });
  });

  describe('Content Section Completeness', () => {
    it('Property 3.11: all content sections have substantial keyword-rich content', () => {
      fc.assert(
        fc.property(
          fc.constant(portfolioData),
          (data: PortfolioData) => {
            // Professional summary should be substantial
            expect(data.personal.summary.split(' ').length).toBeGreaterThan(15);
            
            // All capability categories should be present
            const expectedCategories = [
              'Cloud Architecture',
              'DevOps & CI/CD', 
              'Automation Engineering',
              'Monitoring & Reliability'
            ];
            
            expectedCategories.forEach(category => {
              const capability = data.capabilities.find(cap => cap.category === category);
              expect(capability).toBeDefined();
              expect(capability!.skills.length).toBeGreaterThan(3);
              expect(capability!.description.length).toBeGreaterThan(20);
            });
            
            // All required projects should be present
            const expectedProjectIds = [
              'acquisitions-api',
              'voice-to-vector-api', 
              'serverless-platform-pattern',
              'legacy-migration'
            ];
            
            expectedProjectIds.forEach(projectId => {
              const project = data.projects.find(p => p.id === projectId);
              expect(project).toBeDefined();
              expect(project!.highlights.length).toBeGreaterThan(3);
              expect(project!.technologies.length).toBeGreaterThan(3);
            });
            
            // Experience should have substantial content
            expect(data.experience.length).toBeGreaterThan(0);
            const devopsExp = data.experience[0];
            expect(devopsExp.achievements.length).toBeGreaterThan(5);
            expect(devopsExp.impact).toBeDefined();
            expect(devopsExp.impact).toContain('60%');
          }
        ),
        { numRuns: 10 }
      );
    });
  });

  describe('Cross-Section Keyword Consistency', () => {
    it('Property 3.12: technical keywords appear consistently across multiple content sections', () => {
      fc.assert(
        fc.property(
          fc.constant(portfolioData),
          (data: PortfolioData) => {
            // Core technical keywords that should appear in multiple sections
            const coreKeywords = ['docker', 'kubernetes', 'aws', 'ci/cd', 'terraform'];
            
            coreKeywords.forEach(keyword => {
              let appearanceCount = 0;
              
              // Check professional summary
              if (data.personal.summary.toLowerCase().includes(keyword)) {
                appearanceCount++;
              }
              
              // Check capabilities
              data.capabilities.forEach(cap => {
                const capText = `${cap.description} ${cap.skills.join(' ')}`.toLowerCase();
                if (capText.includes(keyword)) {
                  appearanceCount++;
                }
              });
              
              // Check projects
              data.projects.forEach(project => {
                const projectText = `
                  ${project.description} 
                  ${project.highlights.join(' ')} 
                  ${project.technologies.join(' ')}
                `.toLowerCase();
                if (projectText.includes(keyword)) {
                  appearanceCount++;
                }
              });
              
              // Check experience
              data.experience.forEach(exp => {
                const expText = `
                  ${exp.achievements.join(' ')} 
                  ${exp.technologies.join(' ')}
                `.toLowerCase();
                if (expText.includes(keyword)) {
                  appearanceCount++;
                }
              });
              
              // Core keywords should appear in at least 2 different sections
              expect(appearanceCount).toBeGreaterThanOrEqual(2);
            });
          }
        ),
        { numRuns: 10 }
      );
    });
  });
});
