
export interface Isubcategory {
    results: number
    metadata: Metadata
    data: Isubcategory[]
  }
  
  export interface Metadata {
    currentPage: number
    numberOfPages: number
    limit: number
  }
  
  
  export interface Isubcategory {
    _id: string
    name: string
    slug: string
    category: string
    createdAt: string
    updatedAt: string
  }