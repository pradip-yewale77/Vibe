'use client'

import React, { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'

const Page = () => {
  const router = useRouter()
  const [projects, setProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase
        .from('website_files')
        .select('project_id, created_at')
        .order('created_at', { ascending: false })

      if (error) {
        setError('Error fetching project list')
        console.error(error)
      } else {
        // Filter unique projects by project_id
        const unique = Array.from(
          new Map(data.map(item => [item.project_id, item])).values()
        )
        setProjects(unique)
      }

      setLoading(false)
    }

    fetchProjects()
  }, [])

  const handleViewProject = (projectId: string) => {
    router.push(`/vibe/${projectId}`)
  }

  return (
    <div className="bg-black min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6">All Projects</h1>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <Skeleton className="h-6 w-3/4 bg-gray-700 rounded" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full bg-gray-700 rounded" />
                  <Skeleton className="h-4 w-2/3 bg-gray-700 rounded mt-2" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : error ? (
          <p className="text-red-400">{error}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map(project => (
              <Card
                key={project.project_id}
                className="bg-gray-900 border-gray-800 hover:border-blue-500/40"
              >
                <CardHeader>
                  <CardTitle className="text-white">Project ID</CardTitle>
                  <p className="text-gray-400 text-sm truncate">{project.project_id}</p>
                </CardHeader>
                <CardContent className="flex justify-between items-center">
                  <Badge className="bg-blue-800/30 text-blue-300">
                    {new Date(project.created_at).toLocaleDateString()}
                  </Badge>
                  <Button
                    variant="outline"
                    className="border-blue-600 text-blue-400 hover:bg-blue-900/20"
                    onClick={() => handleViewProject(project.project_id)}
                  >
                    View Project
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Page
