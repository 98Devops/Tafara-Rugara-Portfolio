#!/usr/bin/env node

/**
 * Deployment Test Script
 * Tests the deployment pipeline and form handling functionality
 */

const fs = require('fs');
const path = require('path');

console.log('🚀 Testing Deployment Pipeline...\n');

// Test 1: Verify build output exists
console.log('1. Checking build output...');
const buildDir = path.join(__dirname, '..', '.next');
if (fs.existsSync(buildDir)) {
  console.log('✅ Build directory exists');
  
  // Check for static files
  const staticDir = path.join(buildDir, 'static');
  if (fs.existsSync(staticDir)) {
    console.log('✅ Static assets generated');
  } else {
    console.log('❌ Static assets missing');
  }
} else {
  console.log('❌ Build directory missing - run npm run build first');
  process.exit(1);
}

// Test 2: Verify Netlify configuration
console.log('\n2. Checking Netlify configuration...');
const netlifyConfig = path.join(__dirname, '..', 'netlify.toml');
if (fs.existsSync(netlifyConfig)) {
  console.log('✅ netlify.toml exists');
  
  const config = fs.readFileSync(netlifyConfig, 'utf8');
  
  // Check for required configurations
  const checks = [
    { name: 'Build command', pattern: /command = "npm run build"/ },
    { name: 'Publish directory', pattern: /publish = "\.next"/ },
    { name: 'Form handling', pattern: /\[\[forms\]\]/ },
    { name: 'Security headers', pattern: /X-Frame-Options/ },
    { name: 'Cache headers', pattern: /Cache-Control/ },
    { name: 'Content Security Policy', pattern: /Content-Security-Policy/ },
  ];
  
  checks.forEach(check => {
    if (check.pattern.test(config)) {
      console.log(`✅ ${check.name} configured`);
    } else {
      console.log(`❌ ${check.name} missing`);
    }
  });
} else {
  console.log('❌ netlify.toml missing');
}

// Test 3: Verify required documents exist
console.log('\n3. Checking required documents...');
const documentsDir = path.join(__dirname, '..', 'public', 'documents');
const requiredDocs = ['tafara-rugara-cv.pdf'];

requiredDocs.forEach(doc => {
  const docPath = path.join(documentsDir, doc);
  if (fs.existsSync(docPath)) {
    console.log(`✅ ${doc} exists`);
  } else {
    console.log(`❌ ${doc} missing`);
  }
});

// Test 4: Verify form configuration
console.log('\n4. Checking form configuration...');
const contactFormPath = path.join(__dirname, '..', 'src', 'components', 'ContactForm.tsx');
if (fs.existsSync(contactFormPath)) {
  const formContent = fs.readFileSync(contactFormPath, 'utf8');
  
  const formChecks = [
    { name: 'Netlify form attribute', pattern: /data-netlify="true"/ },
    { name: 'Form name', pattern: /name="contact"/ },
    { name: 'Hidden form-name field', pattern: /name="form-name"/ },
    { name: 'Required form fields', pattern: /name="(name|email|message)"/ },
  ];
  
  formChecks.forEach(check => {
    if (check.pattern.test(formContent)) {
      console.log(`✅ ${check.name} configured`);
    } else {
      console.log(`❌ ${check.name} missing`);
    }
  });
} else {
  console.log('❌ ContactForm.tsx missing');
}

// Test 5: Check package.json scripts
console.log('\n5. Checking build scripts...');
const packageJsonPath = path.join(__dirname, '..', 'package.json');
if (fs.existsSync(packageJsonPath)) {
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  
  const requiredScripts = ['build', 'start', 'lint', 'test'];
  requiredScripts.forEach(script => {
    if (packageJson.scripts && packageJson.scripts[script]) {
      console.log(`✅ ${script} script exists`);
    } else {
      console.log(`❌ ${script} script missing`);
    }
  });
} else {
  console.log('❌ package.json missing');
}

console.log('\n🎉 Deployment pipeline test completed!');
console.log('\n📋 Next steps:');
console.log('1. Commit your changes to Git');
console.log('2. Push to your repository');
console.log('3. Connect your repository to Netlify');
console.log('4. Deploy and test the live site');
console.log('5. Test contact form submission on the live site');