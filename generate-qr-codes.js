#!/usr/bin/env node

// QR Code Generation for PlebMoe Business Initiatives
// Based on SESSION_REPORT_2026-05-27_SeenDem_Portal_Deployment.md

const qrCodes = [
  {
    name: 'Premium Spas & Billiards (PSAB)',
    code: 'psab',
    stage: 5,
    focus: 'wealth-wellness',
    tagline: 'Quality assets for health & wealth',
    url: 'https://seendem.com?qr=psab&focus=wealth-wellness&stage=5'
  },
  {
    name: 'Penn Quarter Rules',
    code: 'pqr',
    stage: 8,
    focus: 'community-ai',
    tagline: 'Proof-of-work applied to discourse',
    url: 'https://seendem.com?qr=pqr&focus=community-ai&stage=8'
  },
  {
    name: 'Solar Strive',
    code: 'solar',
    stage: 6,
    focus: 'energy-sovereignty',
    tagline: 'Energy independence = monetary independence',
    url: 'https://seendem.com?qr=solar&focus=energy-sovereignty&stage=6'
  },
  {
    name: 'Proof of Putt',
    code: 'pop',
    stage: 4,
    focus: 'ai-gamification',
    tagline: 'Merit-based recognition systems',
    url: 'https://seendem.com?qr=pop&focus=ai-gamification&stage=4'
  },
  {
    name: 'Better Boat Brokers',
    code: 'boats',
    stage: 7,
    focus: 'bitcoin-assets',
    tagline: 'Sound money for premium assets',
    url: 'https://seendem.com?qr=boats&focus=bitcoin-assets&stage=7'
  }
];

console.log('🌀 PlebMoe Business Initiative QR Codes\n');
console.log('Each QR code connects to the ecosystem demonstration portal:\n');

qrCodes.forEach(qr => {
  console.log(`📍 ${qr.name}`);
  console.log(`   Code: ${qr.code}`);
  console.log(`   Stage: ${qr.stage}`);
  console.log(`   Focus: ${qr.focus}`);
  console.log(`   Tagline: "${qr.tagline}"`);
  console.log(`   URL: ${qr.url}`);
  console.log('');
});

console.log('💡 Usage Instructions:');
console.log('1. Generate QR codes for each URL above');
console.log('2. Include the tagline on each QR code');
console.log('3. Each QR shows how that initiative connects to broader ecosystem');
console.log('4. Landing experience emphasizes "part of integrated approach"');
console.log('\n🔗 All initiatives connect through shared principles:');
console.log('   • Proof of work applied to different domains');
console.log('   • Verification over trust');
console.log('   • Decentralized value creation');
console.log('   • Local action, global impact');