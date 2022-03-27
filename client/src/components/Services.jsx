import { BsShieldFillCheck } from 'react-icons/bs';
import { BiSearchAlt } from 'react-icons/bi';
import { RiHeart2Fill } from 'react-icons/ri';

const ServicesCard = ({ icon, title, subtitle, color}) => {
  return (
    <div className="white-glassmorphism flex flex-row justify-start items-center p-3 m-3 cursor-pointer hover:shadow-xl">
      <div className={`w-10 h-10 ${color} rounded-full flex justify-center items-center`}>
        {icon}
      </div>
      <div className="ml-5 flex flex-col flex-1">
        <h3 className="text-white text-lg">
          {title}
        </h3>
        <p className="text-white mt-1 text-sm font-light">
          {subtitle}
        </p>
      </div>
    </div>
  )
}

const Services = () => {
  return (
    <div className="w-full flex justify-center items-center gradient-bg-services">
      <div className="flex flex-col justify-between items-center mf:p-20 py-12 px-4">
        <div className="flex-1 flex flex-col justify-center items-center">
          <h1 className="text-white text-3xl sm:text-5xl text-gradient text-center">
            Services that we
            <br /> 
            continue to improve
          </h1>
          <p className="text-white mf:w-9/12 w-11/12 my-4 font-light text-base text-center">
            The best choice for buying and selling your crypto assets, with the 
            various super friendly services we offer.
          </p>
        </div>

        <div className="flex-1 flex flex-col justify-center items-center my-5">
          <ServicesCard 
            color="bg-[#2952E3]"
            title="Security Guarantee"
            icon={<BsShieldFillCheck fontSize={21} className="text-white" />}
            subtitle="Security is guaranteed. We always maintain privacy and quality of our products."
          />
          <ServicesCard 
            color="bg-[#8945F8]"
            title="Best exchange rates"
            icon={<BiSearchAlt fontSize={21} className="text-white" />}
            subtitle="Security is guaranteed. We always maintain privacy and quality of our products."
          />
          <ServicesCard 
            color="bg-[#F84550]"
            title="Fastest transactions"
            icon={<RiHeart2Fill fontSize={21} className="text-white" />}
            subtitle="Security is guaranteed. We always maintain privacy and quality of our products."
          />

        </div>
      </div>
    </div>
  )
}

export default Services;