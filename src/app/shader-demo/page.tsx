'use client';

import AnimatedShaderHero from '@/components/ui/animated-shader-hero';

/**
 * Demo page showing the animated shader hero component.
 * Route: /shader-demo
 */
export default function ShaderHeroDemoPage() {
  return (
    <div className="w-full">
      <AnimatedShaderHero
        trustBadge={{
          text: 'Trusted by forward-thinking teams.',
          icons: ['✨'],
        }}
        headline={{
          line1: 'Launch Your',
          line2: 'Workflow Into Orbit',
        }}
        subtitle="Supercharge productivity with AI-powered automation and integrations built for the next generation of teams — fast, seamless, and limitless."
        buttons={{
          primary: {
            text: 'Get Started for Free',
            onClick: () => console.log('Primary clicked'),
          },
          secondary: {
            text: 'Explore Features',
            onClick: () => console.log('Secondary clicked'),
          },
        }}
      />

      {/* Usage reference */}
      <div className="bg-gray-950 text-gray-100 p-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-white">How to Use</h2>
          <pre className="bg-gray-800/60 border border-gray-700 rounded-xl p-6 text-sm text-gray-300 overflow-x-auto leading-relaxed">
{`import AnimatedShaderHero from '@/components/ui/animated-shader-hero';

<AnimatedShaderHero
  trustBadge={{ text: "Your trust badge", icons: ["🚀"] }}
  headline={{ line1: "First Line", line2: "Second Line" }}
  subtitle="Your compelling subtitle..."
  buttons={{
    primary:   { text: "Primary CTA",   onClick: handlePrimary },
    secondary: { text: "Secondary CTA", onClick: handleSecondary },
  }}
/>`}
          </pre>
        </div>
      </div>
    </div>
  );
}
