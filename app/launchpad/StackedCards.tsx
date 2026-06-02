"use client";

import { useEffect, useRef } from "react";
import { Shield, Network, Lock, Server, Zap } from "lucide-react";

const labs = [
  {
    step: 1,
    title: "Secure VM Access with BeyondCorp & IAP",
    description:
      "Configura acceso seguro a máquinas virtuales usando Identity-Aware Proxy, eliminando la necesidad de VPNs tradicionales.",
    icon: Lock,
    color: "#EA4335",
    tag: "IAP · BeyondCorp",
  },
  {
    step: 2,
    title: "Multiple VPC Networks",
    description:
      "Crea y conecta múltiples redes VPC, configura subredes y establece peering entre proyectos para aislar recursos.",
    icon: Network,
    color: "#4285F4",
    tag: "VPC · Subnets · Peering",
  },
  {
    step: 3,
    title: "Firewall Rules & IAM Control",
    description:
      "Define reglas de firewall granulares y políticas de IAM para controlar el tráfico de red y los permisos de acceso.",
    icon: Shield,
    color: "#34A853",
    tag: "Firewall · IAM · Policies",
  },
  {
    step: 4,
    title: "Load Balancer + Cloud Armor",
    description:
      "Despliega un HTTP(S) Load Balancer global con Cloud Armor para proteger aplicaciones contra ataques DDoS y tráfico malicioso.",
    icon: Server,
    color: "#FBBC04",
    tag: "HTTPS LB · Cloud Armor · WAF",
  },
  {
    step: 5,
    title: "Internal Load Balancer & Challenge Lab",
    description:
      "Configura balanceo de carga interno para servicios privados y demuestra tus habilidades en el lab de desafío final.",
    icon: Zap,
    color: "#EA4335",
    tag: "Internal LB · Challenge",
  },
];

export default function StackedCards() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    let cleanup: (() => void) | undefined;

    const initGSAP = async () => {
      const gsapModule = await import("gsap");
      const scrollTriggerModule = await import("gsap/ScrollTrigger");

      const gsap = gsapModule.gsap;
      const ScrollTrigger = scrollTriggerModule.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      const cards = cardsRef.current;
      const container = containerRef.current;
      if (!container || cards.length === 0) return;

      cards.forEach((card, i) => {
        if (i === cards.length - 1) return;

        ScrollTrigger.create({
          trigger: card,
          start: `top ${80 + i * 10}px`,
          end: `+=${window.innerHeight * 0.5}`,
          pin: true,
          pinSpacing: false,
          scrub: true,
          onUpdate: (self) => {
            const progress = self.progress;
            gsap.set(card, {
              scale: 1 - progress * 0.05,
              opacity: 1 - progress * 0.3,
              filter: `brightness(${1 - progress * 0.15})`,
            });
          },
        });
      });

      cleanup = () => {
        ScrollTrigger.getAll().forEach((t) => t.kill());
      };
    };

    initGSAP();

    return () => {
      cleanup?.();
    };
  }, []);

  return (
    <div className="mt-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section header */}
      <div className="mb-10">
        <p className="text-xs font-semibold text-red uppercase tracking-wider mb-2">
          Ejemplo: Build a Secure Google Cloud Network
        </p>
        <h3 className="text-2xl font-extrabold text-foreground">
          5 labs progresivos
        </h3>
        <p className="mt-2 text-sm text-text-secondary max-w-lg">
          Desde acceso seguro hasta protección completa de infraestructura en un solo badge.
        </p>
      </div>

      {/* Stacked cards container */}
      <div ref={containerRef} className="relative">
        {labs.map((lab, i) => (
          <div
            key={lab.step}
            ref={(el) => {
              if (el) cardsRef.current[i] = el;
            }}
            className="mb-8 last:mb-0"
          >
            <div
              className="relative p-7 rounded-2xl border shadow-lg bg-white"
              style={{ borderColor: `${lab.color}30` }}
            >
              {/* Step indicator */}
              <div className="absolute -top-3.5 left-7 flex items-center gap-2">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center shadow-md"
                  style={{ backgroundColor: lab.color }}
                >
                  <span className="text-white text-[10px] font-bold">{lab.step}</span>
                </div>
                <span
                  className="text-[10px] font-medium px-2.5 py-0.5 rounded-full"
                  style={{
                    backgroundColor: `${lab.color}12`,
                    color: lab.color,
                  }}
                >
                  {lab.tag}
                </span>
              </div>

              <div className="flex items-start gap-4 mt-3">
                {/* Icon */}
                <div
                  className="p-2.5 rounded-xl shrink-0"
                  style={{ backgroundColor: `${lab.color}10` }}
                >
                  <lab.icon className="w-5 h-5" style={{ color: lab.color }} />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h4 className="text-base font-bold text-foreground mb-1.5">
                    {lab.title}
                  </h4>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {lab.description}
                  </p>
                </div>
              </div>

              {/* Progress bar */}
              <div className="mt-5 flex items-center gap-2">
                <div className="flex-1 h-1 rounded-full bg-grey-light overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${(lab.step / labs.length) * 100}%`,
                      backgroundColor: lab.color,
                    }}
                  />
                </div>
                <span className="text-[10px] text-text-secondary font-medium">
                  {lab.step}/{labs.length}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
