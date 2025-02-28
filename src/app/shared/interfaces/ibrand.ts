
export interface Ibrand {
    results: number
    metadata: Metadata
    data: Ibrand[]
  }
  
  export interface Metadata {
    currentPage: number
    numberOfPages: number
    limit: number
    nextPage: number
  }
  
  export interface Ibrand {
    _id: string
    name: string
    slug: string
    image: string
    createdAt: string
    updatedAt: string
  }
  