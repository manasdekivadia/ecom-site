import React,{useEffect,useState} from 'react'

const Stats = () => {

    const[stats,setStats] = useState({
        availableBalance : 0,
        pendingBalance : 0,
        totalCharge : 0,
    });

    const [loading,setLoading] = useState(true);

    useEffect(()=>{
        const fetchStats = async ()=>{
            try {
                const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/stripe/api/stats`);

                if(!response.ok){
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();

                setStats(data);

                setLoading(false);
                
            } catch (error) {
                console.error("Failed to fetch stats : ",error);
                setLoading(false);
            }
        };

        fetchStats();
    },[]);

    const formatCurrency = (value)=>{
        return `₹${value.toLocaleString('en-IN',{
            minimumFractionDigits:0,
            maximumFractionDigits:0,
        })}`;
    }


  return (
   <div className='grid md:grid-cols-3 gap-6 my-10 px-4'>

  <div className="bg-primary text-primary-content rounded-2xl shadow-lg p-6 hover:scale-105 transition-transform duration-300">
    <div className="text-sm font-medium text-base-100 mb-2">Available Balance</div>
    <div className="text-3xl font-bold">
      {loading ? 'Loading...' : formatCurrency(stats.availableBalance)}
    </div>
  </div>

  <div className="bg-secondary text-secondary-content rounded-2xl shadow-lg p-6 hover:scale-105 transition-transform duration-300">
    <div className="text-sm font-medium text-base-100 mb-2">Pending Balance</div>
    <div className="text-3xl font-bold">
      {loading ? 'Loading...' : formatCurrency(stats.pendingBalance)}
    </div>
  </div>

  <div className="bg-accent text-accent-content rounded-2xl shadow-lg p-6 hover:scale-105 transition-transform duration-300">
    <div className="text-sm font-medium text-base-100 mb-2">Total Purchases</div>
    <div className="text-3xl font-bold mb-1">
      {loading ? 'Loading...' : stats.totalCharges}
    </div>
    <div className="text-xs text-base-100">21% more than last month</div>
  </div>

</div>
  )};

export default Stats
