export interface Packages {
    id?: string | number
    packageName?: string
    packageType?: string
    weightUnits?: string
    weight?: number
    dimension: {
        length?: number
        width?: number
        height?: number
        unit?: string
    }
    insuranceDeclared?: number
    contentDescription?: string
    numberOfPackages?: number
    packageStatusType?: string
    createdAt?: string
    createdBy?: any
}