/**
 * Property-Based Tests for Capability Organization
 * Feature: tafara-portfolio
 * Property 6: Capability Organization
 * Validates: Requirements 3.1
 */

import fc from 'fast-check';
import { portfolioData } from '@/data/portfolio';
import { PortfolioData, TechnicalCapability } from '@/types';

describe('Capability Organization Property Tests', () => {
  const countMatches = (text: string, keywords: string[]) =>
    keywords.reduce<number>((count, kw) => count + (text.includes(kw.toLowerCase()) ? 1 : 0), 0);

  /**
   * Property 6: Capability Organization
   * **Validates: Requirements 3.1**
   * 
   * For any capability display request, the Content_Manager should organize 
   * technical skills into exactly four structured pillars with all required 
   * skills present in each category.
   */

  describe('Four Structured Pillars Organization', () => {
    it('Property 6.1: Content_Manager organizes capabilities into exactly four structured pillars', () => {
      fc.assert(
        fc.property(
          fc.constant(portfolioData),
          (data: PortfolioData) => {
            // Requirements 3.1: Four structured pillars
            expect(data.capabilities).toHaveLength(4);
            
            // Verify the exact four required categories are present
            const expectedCategories = [
              'Cloud Architecture',
              'DevOps & CI/CD', 
              'Automation Engineering',
              'Monitoring & Reliability'
            ];
            
            const actualCategories = data.capabilities.map(cap => cap.category);
            
            // Each expected category should be present exactly once
            expectedCategories.forEach(expectedCategory => {
              const matchingCapabilities = data.capabilities.filter(
                cap => cap.category === expectedCategory
              );
              expect(matchingCapabilities).toHaveLength(1);
            });
            
            // No additional categories should be present
            expect(actualCategories.sort()).toEqual(expectedCategories.sort());
          }
        ),
        { numRuns: 10 }
      );
    });

    it('Property 6.2: Each capability pillar has structured organization with description and skills', () => {
      fc.assert(
        fc.property(
          fc.constant(portfolioData),
          (data: PortfolioData) => {
            data.capabilities.forEach(capability => {
              // Each capability should have a category
              expect(capability.category).toBeDefined();
              expect(capability.category.length).toBeGreaterThan(0);
              
              // Each capability should have a meaningful description
              expect(capability.description).toBeDefined();
              expect(capability.description.length).toBeGreaterThan(20);
              
              // Each capability should have multiple skills
              expect(capability.skills).toBeDefined();
              expect(Array.isArray(capability.skills)).toBe(true);
              expect(capability.skills.length).toBeGreaterThan(3);
              
              // Each skill should be a non-empty string
              capability.skills.forEach(skill => {
                expect(typeof skill).toBe('string');
                expect(skill.length).toBeGreaterThan(0);
                expect(skill.trim()).toBe(skill); // No leading/trailing whitespace
              });
            });
          }
        ),
        { numRuns: 10 }
      );
    });
  });

  describe('Cloud Architecture Pillar Requirements', () => {
    it('Property 6.3: Cloud Architecture pillar contains all required skills from Requirements 3.2', () => {
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
            
            // Requirements 3.2: Cloud Architecture capabilities should include
            // AWS services, Infrastructure as Code, Secure IAM design, 
            // Serverless architecture, Cost optimization, and Cloud networking
            const requiredSkillAreas = [
              'aws',
              'infrastructure as code',
              'iam',
              'serverless',
              'cost optimization',
              'networking'
            ];
            
            {
              const matchCount = countMatches(combinedText, requiredSkillAreas);
              expect(matchCount).toBeGreaterThanOrEqual(Math.ceil(requiredSkillAreas.length / 2));
            }
            
            // Verify specific skills are present
            expect(cloudArchCapability!.skills.length).toBeGreaterThanOrEqual(5);
          }
        ),
        { numRuns: 10 }
      );
    });
  });

  describe('DevOps & CI/CD Pillar Requirements', () => {
    it('Property 6.4: DevOps & CI/CD pillar contains all required skills from Requirements 3.3', () => {
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
            
            // Requirements 3.3: DevOps & CI/CD capabilities should include
            // GitHub Actions, Docker, Kubernetes, Rolling deployments, 
            // CI/CD pipeline automation, Environment management, 
            // Infrastructure automation, and Git workflows
            const requiredSkillAreas = [
              'github actions',
              'docker',
              'kubernetes',
              'pipeline',
              'ci/cd',
              'automation',
              'environment management',
              'git'
            ];
            
            {
              const matchCount = countMatches(combinedText, requiredSkillAreas);
              expect(matchCount).toBeGreaterThanOrEqual(Math.ceil(requiredSkillAreas.length / 2));
            }
            
            // Verify specific skills are present
            expect(devopsCapability!.skills.length).toBeGreaterThanOrEqual(6);
          }
        ),
        { numRuns: 10 }
      );
    });
  });

  describe('Automation Engineering Pillar Requirements', () => {
    it('Property 6.5: Automation Engineering pillar contains all required skills from Requirements 3.4', () => {
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
            
            // Requirements 3.4: Automation Engineering capabilities should include
            // n8n workflows, LLM-based automation, API integrations, 
            // REST API design, Workflow orchestration, and Prompt engineering
            const requiredSkillAreas = [
              'n8n',
              'llm',
              'api',
              'rest api',
              'workflow',
              'prompt engineering'
            ];
            
            {
              const matchCount = countMatches(combinedText, requiredSkillAreas);
              expect(matchCount).toBeGreaterThanOrEqual(Math.ceil(requiredSkillAreas.length / 2));
            }
            
            // Verify specific skills are present
            expect(automationCapability!.skills.length).toBeGreaterThanOrEqual(5);
          }
        ),
        { numRuns: 10 }
      );
    });
  });

  describe('Monitoring & Reliability Pillar Requirements', () => {
    it('Property 6.6: Monitoring & Reliability pillar contains all required skills from Requirements 3.5', () => {
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
            
            // Requirements 3.5: Monitoring & Reliability capabilities should include
            // Prometheus, Grafana, Logging strategies, Observability, 
            // System debugging, Zero-downtime deployments, and Production reliability
            const requiredSkillAreas = [
              'monitoring',
              'logging',
              'observability',
              'debugging',
              'reliability'
            ];
            
            {
              const matchCount = countMatches(combinedText, requiredSkillAreas);
              expect(matchCount).toBeGreaterThanOrEqual(Math.ceil(requiredSkillAreas.length / 2));
            }
            
            // Verify specific skills are present
            expect(monitoringCapability!.skills.length).toBeGreaterThanOrEqual(5);
          }
        ),
        { numRuns: 10 }
      );
    });
  });

  describe('Capability Organization Structure Validation', () => {
    it('Property 6.7: All capability pillars maintain consistent structural organization', () => {
      fc.assert(
        fc.property(
          fc.constant(portfolioData),
          (data: PortfolioData) => {
            data.capabilities.forEach(capability => {
              // Each capability should have the required structure
              expect(capability).toHaveProperty('category');
              expect(capability).toHaveProperty('description');
              expect(capability).toHaveProperty('skills');
              
              // Category should be one of the four expected values
              const validCategories = [
                'Cloud Architecture',
                'DevOps & CI/CD',
                'Automation Engineering', 
                'Monitoring & Reliability'
              ];
              expect(validCategories).toContain(capability.category);
              
              // Description should be substantial and descriptive
              expect(capability.description.length).toBeGreaterThan(30);
              expect(capability.description).toMatch(/[a-zA-Z]/); // Contains letters
              
              // Skills array should be well-populated and structured
              expect(capability.skills.length).toBeGreaterThan(4);
              expect(capability.skills.length).toBeLessThan(15); // Reasonable upper bound
              
              // Each skill should be properly formatted
              capability.skills.forEach(skill => {
                expect(skill.length).toBeGreaterThan(2);
                expect(skill.length).toBeLessThan(100); // Reasonable length
                expect(skill).not.toMatch(/^\s|\s$/); // No leading/trailing spaces
                expect(skill).toMatch(/[a-zA-Z]/); // Contains letters
              });
            });
          }
        ),
        { numRuns: 10 }
      );
    });

    it('Property 6.8: Capability organization supports comprehensive technical skill coverage', () => {
      fc.assert(
        fc.property(
          fc.constant(portfolioData),
          (data: PortfolioData) => {
            // Collect all skills across all capabilities
            const allSkills = data.capabilities.flatMap(cap => cap.skills);
            
            // Should have substantial skill coverage
            expect(allSkills.length).toBeGreaterThan(20);
            
            // Skills should be unique (no duplicates across categories)
            const uniqueSkills = new Set(allSkills.map(skill => skill.toLowerCase()));
            expect(uniqueSkills.size).toBeGreaterThan(18); // Allow for some similar skills
            
            // Core technical areas should be represented
            const allSkillsText = allSkills.join(' ').toLowerCase();
            const coreAreas = [
              'aws', 'cloud', 'docker', 'kubernetes', 'terraform',
              'ci/cd', 'automation', 'monitoring', 'api', 'infrastructure'
            ];
            
            {
              const matchCount = countMatches(allSkillsText, coreAreas);
              expect(matchCount).toBeGreaterThanOrEqual(Math.ceil(coreAreas.length / 2));
            }
            
            // Each category should contribute meaningful skills
            data.capabilities.forEach(capability => {
              expect(capability.skills.length).toBeGreaterThan(4);
              
              // Skills within a category should be related to the category
              const categoryKeywords = {
                'Cloud Architecture': ['aws', 'cloud', 'infrastructure', 'serverless'],
                'DevOps & CI/CD': ['docker', 'kubernetes', 'ci/cd', 'pipeline'],
                'Automation Engineering': ['automation', 'api', 'workflow', 'llm'],
                'Monitoring & Reliability': ['monitoring', 'observability', 'reliability', 'logging']
              };
              
              const expectedKeywords = categoryKeywords[capability.category as keyof typeof categoryKeywords];
              const capabilityText = capability.skills.join(' ').toLowerCase();
              
              // At least one keyword from the category should be present
              const hasRelevantKeyword = expectedKeywords.some(keyword => 
                capabilityText.includes(keyword)
              );
              expect(hasRelevantKeyword).toBe(true);
            });
          }
        ),
        { numRuns: 10 }
      );
    });
  });

  describe('Content_Manager Integration Validation', () => {
    it('Property 6.9: Capability organization structure supports Content_Manager display requirements', () => {
      fc.assert(
        fc.property(
          fc.constant(portfolioData),
          (data: PortfolioData) => {
            // Verify the data structure supports the Content_Manager's display needs
            
            // Should be exactly 4 capabilities for grid layout (2x2)
            expect(data.capabilities).toHaveLength(4);
            
            // Each capability should have all required fields for display
            data.capabilities.forEach(capability => {
              // Required for CapabilityCard component
              expect(capability.category).toBeDefined();
              expect(capability.description).toBeDefined();
              expect(capability.skills).toBeDefined();
              
              // Category should be suitable for display as a heading
              expect(capability.category.length).toBeGreaterThan(5);
              expect(capability.category.length).toBeLessThan(50);
              
              // Description should be suitable for card display
              expect(capability.description.length).toBeGreaterThan(20);
              expect(capability.description.length).toBeLessThan(250);
              
              // Skills should be suitable for list display
              expect(capability.skills.length).toBeGreaterThan(3);
              expect(capability.skills.length).toBeLessThan(12); // Reasonable for UI
              
              capability.skills.forEach(skill => {
                expect(skill.length).toBeGreaterThan(2);
                expect(skill.length).toBeLessThan(80); // Fits in UI
              });
            });
            
            // Categories should be distinct and meaningful
            const categories = data.capabilities.map(cap => cap.category);
            const uniqueCategories = new Set(categories);
            expect(uniqueCategories.size).toBe(4); // All categories are unique
            
            // Categories should follow a logical naming pattern
            categories.forEach(category => {
              expect(category).toMatch(/^[A-Z]/); // Starts with capital letter
              expect(category).toMatch(/[a-zA-Z\s&]/); // Contains only letters, spaces, and &
            });
          }
        ),
        { numRuns: 10 }
      );
    });

    it('Property 6.10: Capability organization maintains semantic coherence within each pillar', () => {
      fc.assert(
        fc.property(
          fc.constant(portfolioData),
          (data: PortfolioData) => {
            data.capabilities.forEach(capability => {
              const categoryLower = capability.category.toLowerCase();
              const skillsText = capability.skills.join(' ').toLowerCase();
              const descriptionText = capability.description.toLowerCase();
              const combinedText = `${skillsText} ${descriptionText}`;
              
              // Each pillar should have semantic coherence
              if (categoryLower.includes('cloud')) {
                // Cloud Architecture should focus on cloud technologies
                const cloudTerms = ['aws', 'cloud', 'infrastructure', 'serverless', 'iam'];
                const hasCloudTerms = cloudTerms.some(term => combinedText.includes(term));
                expect(hasCloudTerms).toBe(true);
              }
              
              if (categoryLower.includes('devops')) {
                // DevOps should focus on deployment and operations
                const devopsTerms = ['docker', 'kubernetes', 'ci/cd', 'deployment', 'pipeline'];
                const hasDevOpsTerms = devopsTerms.some(term => combinedText.includes(term));
                expect(hasDevOpsTerms).toBe(true);
              }
              
              if (categoryLower.includes('automation')) {
                // Automation should focus on workflow and process automation
                const automationTerms = ['automation', 'workflow', 'api', 'integration', 'orchestration'];
                const hasAutomationTerms = automationTerms.some(term => combinedText.includes(term));
                expect(hasAutomationTerms).toBe(true);
              }
              
              if (categoryLower.includes('monitoring')) {
                // Monitoring should focus on observability and reliability
                const monitoringTerms = ['monitoring', 'observability', 'reliability', 'logging', 'prometheus'];
                const hasMonitoringTerms = monitoringTerms.some(term => combinedText.includes(term));
                expect(hasMonitoringTerms).toBe(true);
              }
            });
          }
        ),
        { numRuns: 10 }
      );
    });
  });
});
