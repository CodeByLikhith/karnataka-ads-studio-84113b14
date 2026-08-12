export const WHATSAPP_NUMBER = "919008237225";

export function waLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const waMessages = {
  hero: "Hi! I visited your website and would like to discuss creative ideas for my brand.",
  starter:
    "Hi! I visited your website and I'm interested in your Starter package. I'd like to know if it's the right fit for my brand.",
  growth:
    "Hi! I visited your website and I'm interested in the Growth package. I'd like a custom quote for my brand.",
  scale:
    "Hi! I visited your website and I'd like to discuss the Scale package for my business.",
  enterprise:
    "Hi! I represent a growing brand/agency and would like to discuss your Enterprise creative solutions.",
  metaSetup:
    "Hi! I'm interested in Meta Ads Setup. I'd like to know how the setup process works.",
  metaManagement:
    "Hi! I'm interested in Meta Ads Management and would like to discuss my advertising requirements.",
  strategyCall: "Hi! I'd like to talk about creative for my brand.",
  floating:
    "Hi Karnataka Ads Studio! 👋\n\nI visited your website and would like to discuss my brand.\n\nBrand Name:\nWebsite/Instagram:\nWhat I need help with:",
} as const;
