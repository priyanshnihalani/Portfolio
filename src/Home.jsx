import {forwardRef, useRef } from 'react';
import emailjs from 'emailjs-com';


import './Home.css';
import { motion } from 'framer-motion';

const Home = ({contactRef}) => {
    const form = useRef();
    // contactRef = ref; // 👈 Use forwarded ref

    const scrollToContact = () => {
      contactRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    function sendEmail(e) {
        e.preventDefault();

        emailjs.sendForm('service_9j3hkqf', 'template_xehukca', form.current, 'B8P7nWodrCWRWJC27')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
        e.target.reset();
    }

    const fadeInUp = {
        initial: { opacity: 0, y: 50 },
        whileInView: { opacity: 1, y: 0 },
        transition: { duration: 0.6 }
    };

    const cards = [
        { name: "React", style: "bg-blue-300 border-blue-500 rotate-12" },
        { name: "Node.js", style: "bg-green-700 border-green-300 -rotate-8" },
        { name: "Express.js", style: "bg-red-400 border-red-700 rotate-8" },
        { name: "MongoDB", style: "bg-green-300 border-green-600 -rotate-12" },
    ];

    const projectCards = [
        { name: "Swapiify", img: "./images/swapiify.png", visit: "https://swapiify.vercel.app/", design: "bg-purple-400 border-2 border-purple-600 text-white px-6 py-2 rounded-full font-semibold shadow-md hover:bg-purple-500 transition-all duration-300" },
        { name: "Vivah", img: "./images/matrimony.png", visit: "https://github.com/priyanshnihalani/Matrimony_Project", design: "bg-pink-400 border-2 border-pink-600 text-white px-6 py-2 rounded-full font-semibold shadow-md hover:bg-pink-500 transition-all duration-300" },
        { name: "Gold Loan", img: "./images/Gold_Loan.png", visit: "https://gold-loan-hazel.vercel.app/", design: "bg-yellow-400 border-2 border-yellow-600 text-white px-6 py-2 rounded-full font-semibold shadow-md hover:bg-yellow-500 transition-all duration-300" },
        { name: "Tech Blogger", img: "./images/blog.png", visit: "https://github.com/priyanshnihalani/Tech_Blogger", design: "bg-blue-400 border-2 border-blue-600 text-white px-6 py-2 rounded-full font-semibold shadow-md hover:bg-blue-500 transition-all duration-300" },
    ]

    return (
        <>
            {/* HERO SECTION */}
            <motion.div
                className="w-full flex flex-col md:flex-row justify-center items-center lg:items-center px-4 md:px-20 space-y-10 md:space-y-0 md:space-x-20 py-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                <motion.img
                    src="./images/JEMA.png"
                    alt="Jemaimage"
                    className="z-20 w-2/3 sm:w-1/2 md:w-1/3 lg:w-1/4 h-auto"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1 }}
                />

                <motion.div className='w-full flex justify-center md:justify-start items-start' {...fadeInUp}>
                    <img src="./images/contactarrow.png" alt="" className='w-1/3 md:w-1/5 rotate-120' />
                </motion.div>

                <motion.div className='w-full md:w-2/3 lg:w-2/2' {...fadeInUp}>
                    <h1 className="relative w-fit inline-block">
                        <span className="relative z-10 text-xl md:text-4xl font-black">
                            I am Priyansh Nihalani.
                        </span>
                        <span className="absolute bottom-1 left-0 w-full h-2 bg-blue-400 z-0"></span>
                    </h1>

                    <p className='mt-6 text-base md:text-lg w-full'>
                        I'll create website for you in MERN Stack. In modular and scalable way.
                    </p>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="mt-6 bg-black cursor-pointer text-white py-2 px-6 "
                        onClick={scrollToContact}
                    >
                        Hire Me
                    </motion.button>
                </motion.div>
            </motion.div>

            {/* SKILLS SECTION */}
            <section className="w-full flex justify-center items-center py-20 px-4">
                <div className="max-w-6xl w-full flex flex-col items-center">
                    <motion.div
                        className="relative inline-block w-fit"
                        initial={{ y: -30, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="relative z-10 mt-4 font-extrabold text-3xl">
                            My Skills!
                        </h2>
                        <div className="absolute bottom-1 left-0 w-full h-8 bg-blue-400 z-0"></div>
                    </motion.div>

                    <motion.div className='my-6' {...fadeInUp}>
                        <img src="./images/contactarrow.png" alt="" className='w-1/2 md:w-full rotate-45' />
                    </motion.div>

                    <motion.ul
                        className="flex flex-wrap justify-center gap-4 mt-10"
                        initial="hidden"
                        whileInView="visible"
                        variants={{
                            visible: { transition: { staggerChildren: 0.2 } }
                        }}
                    >
                        {cards.map((card, index) => (
                            <motion.li
                                key={index}
                                className={`air-float border-4 w-40 h-48 sm:w-48 sm:h-60 md:w-60 md:h-80 text-xl flex justify-center items-center text-center font-medium rounded-lg ${card.style}`}
                                variants={{
                                    hidden: { opacity: 0, y: 30 },
                                    visible: { opacity: 1, y: 0 }
                                }}
                                whileHover={{ scale: 1.05, rotate: 2 }}
                                transition={{ duration: 0.4 }}
                            >
                                {card.name}
                            </motion.li>
                        ))}
                    </motion.ul>
                </div>
            </section>

            {/* PROJECT SECTION */}
            <section className="w-full flex flex-col justify-center items-center py-20 px-4">
                <motion.div className="w-full max-w-5xl space-y-10 text-center" {...fadeInUp}>
                    <div className='relative inline-block w-fit'>
                        <h2 className="relative z-10 mt-4 font-extrabold text-3xl">
                            My Projects!
                        </h2>
                        <div className="absolute bottom-1 left-0 w-full h-8 bg-blue-400 z-0"></div>
                    </div>

                    <motion.div className='flex justify-center' {...fadeInUp}>
                        <img src="./images/contactarrow.png" alt="" className='w-1/3 md:w-1/10' />
                    </motion.div>

                    <h1 className='font-medium'>Have Created Some Unique Projects</h1>
                </motion.div>

                <motion.div
                    className='flex flex-wrap justify-center items-center gap-4 mt-10 max-w-5xl'
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    {projectCards.map((_, idx) => (
                        <motion.div
                            key={idx}
                            className=' w-60 h-80 border-2 rounded-md bg-white shadow-md'
                            whileHover={{ scale: 1.03 }}
                        >
                            <img src={_.img} alt="" className='w-full h-2/3 object-cover rounded-t-md p-4' />
                            <div className='p-4 flex justify-between items-center  h-1/3'>
                                <h3 className='font-semibold text-lg'>{_.name}</h3>
                                <div className="flex items-center space-x-2">
                                    <a href={_.visit} target="_blank" rel="noopener noreferrer" >
                                        <div className={_.design}>
                                            Visit
                                        </div>
                                    </a>
                                </div>

                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            {/* WORK EXPERIENCE SECTION */}
            <section className="w-full flex flex-col justify-center items-center py-20 px-4">
                <motion.div className="w-full max-w-5xl space-y-10" {...fadeInUp}>
                    <div className='relative inline-block w-fit'>
                        <h2 className="text-left relative z-10 mt-4 font-extrabold text-3xl">
                            Work Experience
                        </h2>
                        <div className="absolute bottom-1 left-0 w-full h-8 bg-blue-400 z-0"></div>
                    </div>
                    <motion.div className='flex justify-center' {...fadeInUp}>
                        <img src="./images/contactarrow.png" alt="" className='w-1/3 md:w-1/10' />
                    </motion.div>
                    <h1 className='font-medium'>Have Done Internships during College</h1>
                </motion.div>

                <motion.div
                    className='mt-10 w-full max-w-4xl flex flex-col gap-6'
                    {...fadeInUp}
                >
                    {[{
                        id: 1,
                        company: 'Avadh Web',
                        role: 'Mern stack developer',
                        desc: 'Worked on Tech Blogger website.',
                        date: '10, April 2025',
                        color: 'bg-green-400 border-green-600'
                    }, {
                        id: 2,
                        company: 'CodeSoft',
                        role: 'Web Developer',
                        desc: 'Worked on basic website task.',
                        date: '4, June 2024',
                        color: 'bg-red-400 border-red-600'
                    }].map(job => (
                        <motion.div
                            key={job.id}
                            className='flex items-center gap-4 p-4 border rounded-md shadow-sm bg-white'
                            whileHover={{ scale: 1.02 }}
                        >
                            <div className={`flex justify-center items-center font-medium ${job.color} w-12 h-12 rounded-full text-white`}>
                                {job.id}
                            </div>
                            <div>
                                <h4 className='font-semibold text-sm'>{job.role} at {job.company}</h4>
                                <p className='text-xs font-medium'>{job.desc}</p>
                                <p className='text-[0.65rem]'>{job.date}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            {/* CONTACT SECTION */}
            <section ref={contactRef} className="w-full flex flex-col justify-center items-center py-20 px-4">
                <motion.div className="w-full max-w-5xl space-y-10" {...fadeInUp}>
                    <div className='relative inline-block w-fit'>
                        <h2 className="text-left relative z-10 font-extrabold text-3xl">
                            Contact Here
                        </h2>
                        <div className="absolute bottom-1 left-0 w-full h-8 bg-blue-400 z-0"></div>
                    </div>
                    <motion.div className='flex justify-center' {...fadeInUp}>
                        <img src="./images/contactarrow.png" alt="" className='w-1/3 md:w-1/10' />
                    </motion.div>
                    <h1 className='font-medium text-center'>Have Project Ideas? Just Say Me <b>Hi</b></h1>

                    <motion.form
                        ref={form}
                        onSubmit={sendEmail}
                        className='flex flex-col w-full items-center gap-6'
                        {...fadeInUp}
                    >
                        {['Your Name', 'Your Email', 'About Project'].map((label, idx) => (
                            <motion.div
                                key={idx}
                                className='flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full max-w-lg'
                                whileHover={{ scale: 1.01 }}
                            >
                                <label
                                    className={`text-sm font-medium w-full sm:w-1/3 ${['text-green-600', 'text-red-600', 'text-yellow-600'][idx]
                                        }`}
                                >
                                    {label}
                                </label>
                                <input
                                    type='text'
                                    name={['user_name', 'user_email', 'user_message'][idx]} // Important for emailjs
                                    className='w-full sm:w-2/3 border-b-2 outline-none py-1 px-2'
                                    required
                                />
                            </motion.div>
                        ))}

                        <motion.button
                            type='submit'
                            className='bg-black text-white px-6 py-2 font-medium'
                            whileHover={{ scale: 1.05 }}
                        >
                            Send Here
                        </motion.button>
                    </motion.form>
                </motion.div>
            </section>
        </>
    );
}

export default Home;