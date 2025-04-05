import Head from 'next/head'
import dynamic from 'next/dynamic'

const Dashboard = dynamic(() => import('../components/AccountingDashboard'), { ssr: false });

export default function Home() {
  return (
    <div>
      <Head>
        <title>Accounting App</title>
      </Head>
      <Dashboard />
    </div>
  )
}
