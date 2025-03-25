'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { 
  FaReact, 
  FaNodeJs, 
  FaJs, 
  FaHtml5, 
  FaCss3Alt,
  FaFigma,
  FaGoogle,
  FaSearchengin,
  FaChartLine,
  FaDatabase,
  FaMobileAlt,
  FaDesktop,
  FaPython
} from 'react-icons/fa';
import { SiTypescript, SiNextdotjs, SiTailwindcss, SiAdobephotoshop } from 'react-icons/si';

const skills = [
  { 
    category: 'Frontend', 
    color: '#3B82F6', 
    items: [
      { name: 'React', icon: <FaReact size={40} className="text-[#61DAFB]" />, level: 90 },
      { name: 'Next.js', icon: <SiNextdotjs size={40} className="text-white dark:text-white" />, level: 85 },
      { name: 'TypeScript', icon: <SiTypescript size={40} className="text-[#3178C6]" />, level: 80 },
      { name: 'JavaScript', icon: <FaJs size={40} className="text-[#F7DF1E]" />, level: 95 },
      { name: 'HTML5', icon: <FaHtml5 size={40} className="text-[#E34F26]" />, level: 95 },
      { name: 'CSS3', icon: <FaCss3Alt size={40} className="text-[#1572B6]" />, level: 90 },
      { name: 'Tailwind CSS', icon: <SiTailwindcss size={40} className="text-[#06B6D4]" />, level: 85 },
    ]
  },
  { 
    category: 'Backend', 
    color: '#8B5CF6',
    items: [
      { name: 'Node.js', icon: <FaNodeJs size={40} className="text-[#339933]" />, level: 85 },
      { name: 'Python', icon: <FaPython size={40} className="text-[#3776AB]" />, level: 88 },
      { name: 'Databases', icon: <FaDatabase size={40} className="text-[#4479A1]" />, level: 80 },
      { name: 'REST APIs', icon: <FaDesktop size={40} className="text-[#FF5733]" />, level: 90 },
    ]
  },
  { 
    category: 'Design', 
    color: '#EC4899',
    items: [
      { name: 'Figma', icon: <FaFigma size={40} className="text-[#F24E1E]" />, level: 80 },
      { name: 'Photoshop', icon: <SiAdobephotoshop size={40} className="text-[#31A8FF]" />, level: 75 },
      { name: 'UI/UX', icon: <FaMobileAlt size={40} className="text-[#FF7C00]" />, level: 85 },
    ]
  },
  { 
    category: 'SEO & Marketing', 
    color: '#10B981',
    items: [
      { name: 'SEO Research', icon: <FaSearchengin size={40} className="text-[#4285F4]" />, level: 90 },
      { name: 'Google Analytics', icon: <FaGoogle size={40} className="text-[#EA4335]" />, level: 85 },
      { name: 'Performance Optimization', icon: <FaChartLine size={40} className="text-[#34A853]" />, level: 80 },
    ]
  }
];

const SkillsAnimation = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100]);

  const iconAnimation = {
    initial: { opacity: 0, scale: 0.8, y: 20 },
    animate: { opacity: 1, scale: 1, y: 0 },
    hover: { scale: 1.15, rotate: [0, -5, 5, 0], transition: { duration: 0.2 } }
  };

  const containerAnimation = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2
      }
    }
  };

  const itemAnimation = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-800 overflow-hidden">
      <motion.div 
        ref={containerRef}
        style={{ opacity, y }}
        className="container mx-auto px-4"
        variants={containerAnimation}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="text-center mb-16">
          <motion.h2 
            className="text-4xl font-playfair font-bold mb-4 gradient-text"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            My Skills & Expertise
          </motion.h2>
          <motion.div 
            className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-6"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          ></motion.div>
          <motion.p 
            className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            I specialize in a range of technical skills and continuously expand my expertise to deliver exceptional solutions.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {skills.map((skillGroup, groupIndex) => (
            <motion.div 
              key={skillGroup.category}
              className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              variants={itemAnimation}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center mb-6">
                <div className="w-3 h-12 rounded-full" style={{ backgroundColor: skillGroup.color }}></div>
                <h3 className="text-2xl font-playfair font-bold ml-4 dark:text-white">{skillGroup.category}</h3>
              </div>

              <motion.div 
                className="space-y-6"
                variants={containerAnimation}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
              >
                {skillGroup.items.map((skill, index) => (
                  <motion.div 
                    key={skill.name} 
                    className="flex flex-col sm:flex-row sm:items-center"
                    variants={itemAnimation}
                    custom={index}
                    whileHover="hover"
                  >
                    <motion.div 
                      className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-4 p-3 rounded-lg bg-gray-100 dark:bg-gray-800 w-16 h-16 flex items-center justify-center"
                      variants={iconAnimation}
                    >
                      {skill.icon}
                    </motion.div>
                    <div className="flex-grow">
                      <div className="flex justify-between mb-1">
                        <span className="font-semibold dark:text-white">{skill.name}</span>
                        <span className="text-gray-500 dark:text-gray-400">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
                        <motion.div 
                          className="h-2.5 rounded-full" 
                          style={{ 
                            backgroundColor: skillGroup.color,
                            width: `${skill.level}%` 
                          }}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          transition={{ duration: 0.6, delay: 0.05 * index }}
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Floating Icons Animation */}
        <div className="relative h-40 mt-16 overflow-hidden">
          <motion.div 
            className="absolute inset-0 flex items-center justify-around"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            {[
              <FaReact key="react" size={30} className="text-[#61DAFB]" />,
              <SiNextdotjs key="next" size={30} className="text-black dark:text-white" />,
              <FaNodeJs key="node" size={30} className="text-[#339933]" />,
              <FaPython key="python" size={30} className="text-[#3776AB]" />,
              <SiTypescript key="ts" size={30} className="text-[#3178C6]" />,
              <FaJs key="js" size={30} className="text-[#F7DF1E]" />,
              <FaHtml5 key="html" size={30} className="text-[#E34F26]" />,
              <FaCss3Alt key="css" size={30} className="text-[#1572B6]" />,
              <SiTailwindcss key="tailwind" size={30} className="text-[#06B6D4]" />,
              <FaFigma key="figma" size={30} className="text-[#F24E1E]" />,
            ].map((icon, index) => (
              <motion.div
                key={index}
                animate={{
                  y: [0, -15, 0],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: index * 0.1
                }}
              >
                {icon}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default SkillsAnimation; 