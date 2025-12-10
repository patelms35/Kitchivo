// import React, { useState } from 'react';
// import Navbar from '../../components/Navbar';
// import Footer from '../../components/Footer';
// import Breadcrumb from '../../components/Breadcrumb';

// const Contact = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     subject: '',
//     message: '',
//   });

//   const [errors, setErrors] = useState({});
//   const [submitted, setSubmitted] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//     // Clear error when user starts typing
//     if (errors[name]) {
//       setErrors(prev => ({
//         ...prev,
//         [name]: ''
//       }));
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};

//     if (!formData.name.trim()) {
//       newErrors.name = 'Name is required';
//     }

//     if (!formData.email.trim()) {
//       newErrors.email = 'Email is required';
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = 'Email is invalid';
//     }

//     if (!formData.phone.trim()) {
//       newErrors.phone = 'Phone number is required';
//     } else if (!/^\d{10}$/.test(formData.phone.replace(/\s/g, ''))) {
//       newErrors.phone = 'Phone number must be 10 digits';
//     }

//     if (!formData.subject.trim()) {
//       newErrors.subject = 'Subject is required';
//     }

//     if (!formData.message.trim()) {
//       newErrors.message = 'Message is required';
//     } else if (formData.message.trim().length < 10) {
//       newErrors.message = 'Message must be at least 10 characters';
//     }

//     return newErrors;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const newErrors = validateForm();

//     if (Object.keys(newErrors).length === 0) {
//       // Form is valid, submit the data
//       console.log('Form submitted:', formData);
//       setSubmitted(true);
//       // Reset form
//       setFormData({
//         name: '',
//         email: '',
//         phone: '',
//         subject: '',
//         message: '',
//       });
//       // Hide success message after 5 seconds
//       setTimeout(() => setSubmitted(false), 5000);
//     } else {
//       setErrors(newErrors);
//     }
//   };

//   const contactInfo = [
//     {
//       icon: (
//         <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
//         </svg>
//       ),
//       title: 'Phone',
//       details: ['+91 0123456789', '+91 9876543210'],
//       link: 'tel:+910123456789',
//     },
//     {
//       icon: (
//         <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//         </svg>
//       ),
//       title: 'Email',
//       details: ['support@kitchivo.com', 'sales@kitchivo.com'],
//       link: 'mailto:support@kitchivo.com',
//     },
//     {
//       icon: (
//         <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//         </svg>
//       ),
//       title: 'Address',
//       details: ['123 Kitchen Street, MG Road', 'Mumbai, Maharashtra 400001'],
//       link: null,
//     },
//     {
//       icon: (
//         <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//         </svg>
//       ),
//       title: 'Working Hours',
//       details: ['Monday - Saturday: 9:00 AM - 8:00 PM', 'Sunday: 10:00 AM - 6:00 PM'],
//       link: null,
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-gray-50 font-sans">
//       <Navbar />

//       <Breadcrumb 
//         items={[
//           { label: 'Home', href: '/' },
//           { label: 'Contact Us' }
//         ]}
//       />

//       {/* Hero Section with Background Image */}
//       <section className="relative h-[400px] sm:h-[500px] lg:h-[600px] overflow-hidden">
//         {/* Background Image */}
//         <div className="absolute inset-0">
//           <img 
//             src="https://images.unsplash.com/photo-1556910096-6f5e72db6803?w=1920&h=1080&fit=crop" 
//             alt="Contact Kitchivo" 
//             className="w-full h-full object-cover"
//           />
//           {/* Overlay */}
//           <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/50 to-black/30"></div>
//         </div>

//         {/* Content */}
//         <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
//           <div className="max-w-2xl">
//             <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
//               Contact Us
//             </h1>
//             <p className="text-base sm:text-lg md:text-xl text-gray-200 mb-6 sm:mb-8 leading-relaxed">
//               Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4">
//               <a 
//                 href="#contact-form"
//                 className="px-6 sm:px-8 py-3 sm:py-4 bg-lima-600 text-white rounded-lg font-semibold text-sm sm:text-base hover:bg-lima-700 transition-all duration-300 text-center"
//               >
//                 Send Message
//               </a>
//               <a 
//                 href="#contact-info"
//                 className="px-6 sm:px-8 py-3 sm:py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white rounded-lg font-semibold text-sm sm:text-base hover:bg-white/20 transition-all duration-300 text-center"
//               >
//                 View Details
//               </a>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Contact Form & Map */}
//       <section id="contact-form" className="py-12 sm:py-16 bg-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
//             {/* Contact Form */}
//             <div>
//               <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
//                 Send Us a Message
//               </h2>
//               <p className="text-sm sm:text-base text-gray-600 mb-6">
//                 Fill out the form below and our team will get back to you within 24 hours.
//               </p>

//               {submitted && (
//                 <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
//                   <svg className="w-5 h-5 text-green-600 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
//                     <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//                   </svg>
//                   <div>
//                     <h4 className="text-sm font-semibold text-green-800 mb-1">Message Sent Successfully!</h4>
//                     <p className="text-sm text-green-700">Thank you for contacting us. We'll get back to you soon.</p>
//                   </div>
//                 </div>
//               )}

//               <form onSubmit={handleSubmit} className="space-y-5">
//                 {/* Name */}
//                 <div>
//                   <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
//                     Full Name *
//                   </label>
//                   <input
//                     type="text"
//                     id="name"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lima-600 transition-all ${
//                       errors.name ? 'border-red-500' : 'border-gray-300'
//                     }`}
//                     placeholder="Enter your name"
//                   />
//                   {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
//                 </div>

//                 {/* Email & Phone */}
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
//                   <div>
//                     <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
//                       Email Address *
//                     </label>
//                     <input
//                       type="email"
//                       id="email"
//                       name="email"
//                       value={formData.email}
//                       onChange={handleChange}
//                       className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lima-600 transition-all ${
//                         errors.email ? 'border-red-500' : 'border-gray-300'
//                       }`}
//                       placeholder="your@email.com"
//                     />
//                     {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
//                   </div>

//                   <div>
//                     <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
//                       Phone Number *
//                     </label>
//                     <input
//                       type="tel"
//                       id="phone"
//                       name="phone"
//                       value={formData.phone}
//                       onChange={handleChange}
//                       className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lima-600 transition-all ${
//                         errors.phone ? 'border-red-500' : 'border-gray-300'
//                       }`}
//                       placeholder="9876543210"
//                     />
//                     {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
//                   </div>
//                 </div>

//                 {/* Subject */}
//                 <div>
//                   <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
//                     Subject *
//                   </label>
//                   <input
//                     type="text"
//                     id="subject"
//                     name="subject"
//                     value={formData.subject}
//                     onChange={handleChange}
//                     className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lima-600 transition-all ${
//                       errors.subject ? 'border-red-500' : 'border-gray-300'
//                     }`}
//                     placeholder="How can we help you?"
//                   />
//                   {errors.subject && <p className="mt-1 text-sm text-red-500">{errors.subject}</p>}
//                 </div>

//                 {/* Message */}
//                 <div>
//                   <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
//                     Message *
//                   </label>
//                   <textarea
//                     id="message"
//                     name="message"
//                     value={formData.message}
//                     onChange={handleChange}
//                     rows="5"
//                     className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lima-600 transition-all resize-none ${
//                       errors.message ? 'border-red-500' : 'border-gray-300'
//                     }`}
//                     placeholder="Write your message here..."
//                   />
//                   {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message}</p>}
//                 </div>

//                 {/* Submit Button */}
//                 <button
//                   type="submit"
//                   className="w-full bg-lima-600 text-white py-3 px-6 rounded-lg font-semibold text-base hover:bg-lima-700 active:bg-lima-800 transition-all duration-300 flex items-center justify-center gap-2"
//                 >
//                   <span>Send Message</span>
//                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
//                   </svg>
//                 </button>
//               </form>
//             </div>

//             {/* Map & Additional Info */}
//             <div className="space-y-6">
//               {/* Map */}
//               <div className="h-[300px] lg:h-[400px] rounded-xl overflow-hidden shadow-lg">
//                 <iframe
//                   title="Kitchivo Location"
//                   src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.9447532267817!2d72.82567831490214!3d19.01759998711988!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7ce5f97f9b2cf%3A0x9d2ff8f9a4be5b66!2sMarine%20Drive%2C%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1635850891234!5m2!1sen!2sin"
//                   width="100%"
//                   height="100%"
//                   style={{ border: 0 }}
//                   allowFullScreen=""
//                   loading="lazy"
//                 />
//               </div>

//               {/* Visit Our Store */}
//               <div className="bg-gray-50 rounded-xl p-6">
//                 <h3 className="text-xl font-bold text-gray-900 mb-4">
//                   Visit Our Store
//                 </h3>
//                 <p className="text-sm text-gray-600 mb-4">
//                   Come visit our showroom to see and feel the quality of our products. Our friendly staff is ready to assist you.
//                 </p>
//                 <div className="space-y-3">
//                   <div className="flex items-start gap-3">
//                     <svg className="w-5 h-5 text-lima-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                     </svg>
//                     <span className="text-sm text-gray-700">Free parking available</span>
//                   </div>
//                   <div className="flex items-start gap-3">
//                     <svg className="w-5 h-5 text-lima-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                     </svg>
//                     <span className="text-sm text-gray-700">Expert product consultation</span>
//                   </div>
//                   <div className="flex items-start gap-3">
//                     <svg className="w-5 h-5 text-lima-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                     </svg>
//                     <span className="text-sm text-gray-700">Easy exchange & returns</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Get in Touch - Contact Info Cards */}
//       <section id="contact-info" className="py-12 sm:py-16 bg-gray-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-8 sm:mb-12">
//             <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
//               Get in Touch
//             </h2>
//             <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
//               We're here to help! Reach out to us through any of these channels.
//             </p>
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//             {contactInfo.map((info, index) => (
//               <div key={index} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300">
//                 <div className="w-12 h-12 bg-lima-100 rounded-lg flex items-center justify-center text-lima-600 mb-4">
//                   {info.icon}
//                 </div>
//                 <h3 className="text-lg font-bold text-gray-900 mb-3">
//                   {info.title}
//                 </h3>
//                 {info.details.map((detail, idx) => (
//                   <p key={idx} className="text-sm text-gray-600 mb-1">
//                     {info.link && idx === 0 ? (
//                       <a href={info.link} className="hover:text-lima-600 transition-colors">
//                         {detail}
//                       </a>
//                     ) : (
//                       detail
//                     )}
//                   </p>
//                 ))}
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       <Footer />
//     </div>
//   );
// };

// export default Contact;


import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Breadcrumb from "../../components/Breadcrumb";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createContact } from "../../redux/slices/CommanSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const Contact = () => {
  const dispatch = useDispatch();

  const [submitted, setSubmitted] = useState(false);

  // Yup Validation Schema
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Email is invalid")
      .required("Email is required"),
    phone: Yup.string()
      .matches(/^\d{10}$/, "Phone number must be 10 digits")
      .required("Phone number is required"),
    subject: Yup.string().required("Subject is required"),
    message: Yup.string()
      .min(10, "Message must be at least 10 characters")
      .required("Message is required"),
  });

  // Formik
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setSubmitting(true)
      await dispatch(createContact(values)).then((res) => {
        if (res?.payload?.status == 1) {
          toast.success((res?.payload?.message || "Message Sent Successfully!"));
          setSubmitting(false)
          setSubmitted(true);
          resetForm();
        }
      }).then().catch((err) => {
        toast.error("Something went wrong Please try again!");
        console.log("Errror", err);
      }).catch(() => {
        toast.error("Something went wrong Please try again!");
      });

    },
  });

  // Contact info cards (same as your code)
  const contactInfo = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      title: "Phone",
      details: ["+91 0123456789", "+91 9876543210"],
      link: "tel:+910123456789",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: "Email",
      details: ["support@kitchivo.com", "sales@kitchivo.com"],
      link: "mailto:support@kitchivo.com",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: "Address",
      details: ["123 Kitchen Street, MG Road", "Mumbai, Maharashtra 400001"],
      link: null,
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Working Hours",
      details: ["Monday - Saturday: 9:00 AM - 8:00 PM", "Sunday: 10:00 AM - 6:00 PM"],
      link: null,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />

      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Contact Us" },
        ]}
      />

      <section className="py-12 sm:py-16 bg-white" id="contact-form">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

            {/* LEFT FORM */}
            <div>
              <h2 className="text-2xl font-bold mb-2">Send Us a Message</h2>
              <p className="text-gray-600 mb-6">Fill out the form below…</p>

              {submitted && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-800 font-semibold">Message Sent Successfully!</p>
                </div>
              )}

              <form onSubmit={formik.handleSubmit} className="space-y-5">

                {/* Name */}
                <div>
                  <label className="block text-sm font-semibold mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`w-full px-4 py-3 border rounded-lg ${formik.touched.name && formik.errors.name
                      ? "border-red-500"
                      : "border-gray-300"
                      }`}
                    placeholder="Enter your name"
                  />
                  {formik.touched.name && formik.errors.name && (
                    <p className="text-red-500 text-sm">{formik.errors.name}</p>
                  )}
                </div>

                {/* Email + Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`w-full px-4 py-3 border rounded-lg ${formik.touched.email && formik.errors.email
                        ? "border-red-500"
                        : "border-gray-300"
                        }`}
                      placeholder="email@example.com"
                    />
                    {formik.touched.email && formik.errors.email && (
                      <p className="text-red-500 text-sm">{formik.errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Phone *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formik.values.phone}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`w-full px-4 py-3 border rounded-lg ${formik.touched.phone && formik.errors.phone
                        ? "border-red-500"
                        : "border-gray-300"
                        }`}
                      placeholder="XXXXXXXXXX"
                    />
                    {formik.touched.phone && formik.errors.phone && (
                      <p className="text-red-500 text-sm">{formik.errors.phone}</p>
                    )}
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-sm font-semibold mb-2">Subject *</label>
                  <input
                    type="text"
                    name="subject"
                    value={formik.values.subject}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`w-full px-4 py-3 border rounded-lg ${formik.touched.subject && formik.errors.subject
                      ? "border-red-500"
                      : "border-gray-300"
                      }`}
                    placeholder="How can we help?"
                  />
                  {formik.touched.subject && formik.errors.subject && (
                    <p className="text-red-500 text-sm">{formik.errors.subject}</p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-semibold mb-2">Message *</label>
                  <textarea
                    name="message"
                    rows="5"
                    value={formik.values.message}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`w-full px-4 py-3 border rounded-lg resize-none ${formik.touched.message && formik.errors.message
                      ? "border-red-500"
                      : "border-gray-300"
                      }`}
                    placeholder="Write your message…"
                  />
                  {formik.touched.message && formik.errors.message && (
                    <p className="text-red-500 text-sm">{formik.errors.message}</p>
                  )}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full bg-lima-600 text-white py-3 rounded-lg hover:bg-lima-700 transition"
                >
                  {formik.isSubmitting ? "Loading..." : "Send Message"}
                </button>
              </form>
            </div>

            {/* Right side map (unchanged) */}
            {/* YOUR ORIGINAL MAP + VISIT INFO CODE KEPT SAME */}
          </div>
        </div>
      </section>

      {/* Contact Info Cards – with hover effects */}
      <section className="py-12 sm:py-16 bg-gray-50" id="contact-info">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, i) => (
              <div 
                key={i} 
                className="group bg-white p-6 rounded-xl shadow-sm border border-transparent hover:shadow-xl hover:border-lima-200 hover:-translate-y-2 transition-all duration-300 ease-out cursor-pointer relative overflow-hidden"
              >
                {/* Background gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-lima-50/0 to-lima-100/0 group-hover:from-lima-50/50 group-hover:to-lima-100/30 transition-all duration-300 pointer-events-none" />
                
                {/* Icon container with animation */}
                <div className="relative w-12 h-12 bg-lima-100 rounded-lg flex items-center justify-center text-lima-600 mb-4 group-hover:bg-lima-600 group-hover:text-white group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 ease-out group-hover:shadow-lg group-hover:shadow-lima-200">
                  {info.icon}
                </div>
                
                {/* Title with underline animation */}
                <h3 className="relative font-bold text-lg mb-2 text-gray-900 group-hover:text-lima-700 transition-colors duration-300">
                  {info.title}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-lima-500 group-hover:w-full transition-all duration-300 ease-out" />
                </h3>
                
                {/* Details */}
                {info.details.map((d, idx) => (
                  <p key={idx} className="relative text-gray-600 text-sm group-hover:text-gray-700 transition-colors duration-200">
                    {info.link && idx === 0 ? (
                      <a href={info.link} className="hover:text-lima-600 transition-colors">{d}</a>
                    ) : (
                      d
                    )}
                  </p>
                ))}

                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-lima-500/0 to-transparent group-hover:from-lima-500/10 transition-all duration-300 rounded-bl-full" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
