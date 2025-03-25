'use client';

import { motion } from 'framer-motion';
import { 
  FaPalette, 
  FaDatabase, 
  FaLaptopCode, 
  FaMobileAlt, 
  FaServer, 
  FaWordpressSimple 
} from 'react-icons/fa';

const serviceData = [
  {
    id: 1,
    title: 'Graphic Design',
    description: 'Eye-catching designs that communicate your brand message effectively.',
    icon: <FaPalette className="text-5xl text-blue-500 mb-4" />,
    color: 'from-blue-500 to-blue-600',
  },
  {
    id: 2,
    title: 'Data Management',
    description: 'Efficient data organization, processing, and analytics solutions.',
    icon: <FaDatabase className="text-5xl text-purple-500 mb-4" />,
    color: 'from-purple-500 to-purple-600',
  },
  {
    id: 3,
    title: 'Web Development',
    description: 'Responsive, modern, and optimized websites built with the latest technologies.',
    icon: <FaLaptopCode className="text-5xl text-indigo-500 mb-4" />,
    color: 'from-indigo-500 to-indigo-600',
  },
  {
    id: 4,
    title: 'App Development',
    description: 'Native and cross-platform mobile applications for iOS and Android.',
    icon: <FaMobileAlt className="text-5xl text-pink-500 mb-4" />,
    color: 'from-pink-500 to-pink-600',
  },
  {
    id: 5,
    title: 'Full Stack Development',
    description: 'End-to-end solutions covering both frontend and backend development.',
    icon: <FaServer className="text-5xl text-green-500 mb-4" />,
    color: 'from-green-500 to-green-600',
  },
  {
    id: 6,
    title: 'WordPress & CMS',
    description: 'Custom WordPress themes, plugins, and content management solutions.',
    icon: <FaWordpressSimple className="text-5xl text-orange-500 mb-4" />,
    color: 'from-orange-500 to-orange-600',
  },
];

const Services = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section className="py-20 bg-white dark:bg-gray-900" id="services">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-playfair font-bold mb-4 dark:text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            My Services
          </motion.h2>
          <motion.div 
            className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-6"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
          <motion.p 
            className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Comprehensive solutions to help your business thrive in the digital world.
          </motion.p>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {serviceData.map((service) => (
            <motion.div
              key={service.id}
              className="group relative bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
              
              {/* Service Content */}
              <div className="relative z-10">
                <div className={`bg-gradient-to-r ${service.color} text-white p-3 rounded-lg w-fit mb-6`}>
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 dark:text-white">{service.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{service.description}</p>
              </div>
              
              {/* Hover Effect */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services; 