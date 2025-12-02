'use server'

import { PrismaClient } from '@prisma/client'
import { revalidatePath } from 'next/cache'

const prisma = new PrismaClient()

export async function getIssues() {
  try {
    const issues = await prisma.issue.findMany({
      include: {
        status: true,
        assignee: true,
        labels: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
    return { success: true, data: issues }
  } catch (error) {
    console.error('Failed to fetch issues:', error)
    return { success: false, error: 'Failed to fetch issues' }
  }
}

export async function createIssue(data: {
  title: string
  description?: string
  priority: string
  statusId: string
  assigneeId?: string
  creatorId: string // In a real app, this would be inferred from the session
}) {
  try {
    // Generate a simple identifier (e.g., TIT-101)
    const count = await prisma.issue.count()
    const identifier = `TIT-${100 + count + 1}`

    const issue = await prisma.issue.create({
      data: {
        ...data,
        identifier,
      },
    })

    revalidatePath('/dashboard')
    return { success: true, data: issue }
  } catch (error) {
    console.error('Failed to create issue:', error)
    return { success: false, error: 'Failed to create issue' }
  }
}

export async function updateIssueStatus(issueId: string, statusId: string) {
  try {
    const issue = await prisma.issue.update({
      where: { id: issueId },
      data: { statusId },
    })

    revalidatePath('/dashboard')
    return { success: true, data: issue }
  } catch (error) {
    console.error('Failed to update issue status:', error)
    return { success: false, error: 'Failed to update issue status' }
  }
}

export async function getStatuses() {
    try {
        const statuses = await prisma.status.findMany({
            orderBy: { position: 'asc' }
        })
        return { success: true, data: statuses }
    } catch (error) {
        return { success: false, error: 'Failed to fetch statuses' }
    }
}
