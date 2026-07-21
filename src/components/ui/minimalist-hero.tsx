import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

// Define the props interface for type safety and reusability
interface MinimalistHeroProps {
  logoText: string;
  mainText: string;
  readMoreLink: string;
  imageSrc: string;
  imageAlt: string;
  overlayText: {
    part1: string;
    part2: string;
  };
  socialLinks: { icon: LucideIcon; href: string }[];
  locationText: string;
  className?: string;
}

// Helper component for social media icons
const SocialIcon = ({ href, icon: Icon }: { href: string; icon: LucideIcon }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="text-foreground/60 transition-colors hover:text-foreground">
    <Icon className="h-5 w-5" />
  </a>
);

// The main reusable Hero Section component
export const MinimalistHero = ({
  logoText,
  mainText,
  readMoreLink,
  imageSrc,
  imageAlt,
  overlayText,
  socialLinks,
  locationText,
  className,
}: MinimalistHeroProps) => {
  return (
    <div
      className={cn(
        'relative flex h-screen w-full flex-col items-center justify-between overflow-hidden bg-background p-8 font-sans md:p-12',
        className
      )}
    >
      {/* Spacer for global nav */}
      <div className="w-full pt-4" />

      {/* Main Content Area */}
      <div className="relative grid w-full max-w-7xl flex-grow grid-cols-1 items-center md:grid-cols-3">
        {/* Left Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="z-20 order-2 md:order-1 text-center md:text-left"
        >
          <p className="mx-auto max-w-sm text-base leading-relaxed text-foreground/80 md:mx-0 md:text-lg">{mainText}</p>
          <a href={readMoreLink} className="mt-4 inline-block text-sm font-medium text-foreground underline decoration-from-font">
            Read More
          </a>
        </motion.div>

        {/* Center Image with Circle */}
        <div className="relative order-1 md:order-2 flex justify-center items-center h-full">
            {/* Single yellow circle that clips everything */}
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                className="relative h-[300px] w-[300px] rounded-full bg-yellow-400/90 overflow-hidden md:h-[400px] md:w-[400px] lg:h-[500px] lg:w-[500px]"
            >
                <motion.div
                    className="absolute top-[12%] left-0 w-full h-full"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
                >
                    <Image
                        src={imageSrc}
                        alt={imageAlt}
                        fill
                        priority
                        sizes="(max-width: 768px) 300px, (max-width: 1024px) 400px, 500px"
                        className="object-cover object-top"
                        onError={(e) => {
                            // Hide the broken image; the yellow circle + overlay text still read as designed
                            (e.target as HTMLImageElement).style.display = 'none';
                        }}
                    />
                </motion.div>
            </motion.div>
        </div>

        {/* Right Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="z-20 order-3 flex items-center justify-center text-center md:justify-start md:-ml-6 lg:-ml-10"
        >
          <h1 className="text-7xl font-extrabold text-foreground md:text-8xl lg:text-9xl">
            {overlayText.part1}
            <br />
            {overlayText.part2}
          </h1>
        </motion.div>
      </div>

      {/* Footer Elements */}
      <footer className="z-30 flex w-full max-w-7xl items-center justify-between">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="flex items-center space-x-4"
        >
          {socialLinks.map((link, index) => (
            <SocialIcon key={index} href={link.href} icon={link.icon} />
          ))}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.3 }}
          className="text-sm font-medium text-foreground/80"
        >
          {locationText}
        </motion.div>
      </footer>
    </div>
  );
};
