import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Map } from 'lucide-react'

export default function NotFound() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 text-center px-4">
            <div className="bg-white p-12 rounded-3xl shadow-xl border border-gray-100 max-w-lg w-full">
                <div className="flex justify-center mb-6">
                    <div className="h-24 w-24 bg-blue-50 rounded-full flex items-center justify-center">
                        <Map className="h-12 w-12 text-blue-600" />
                    </div>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Page Not Found</h2>
                <p className="text-gray-500 mb-8 max-w-md mx-auto">
                    Oops! It seems you've wandered off the map. The destination you're looking for doesn't exist or has been moved.
                </p>
                <Link href="/">
                    <Button size="lg" className="rounded-full bg-blue-600 hover:bg-blue-700 px-8">
                        Return Home
                    </Button>
                </Link>
            </div>
        </div>
    )
}
