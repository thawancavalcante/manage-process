export class Advise {
    public id: string
    public description: string
    public process_id: string
}

export class Adviser {
    public id: string
    public name: string
}

export class Process {
    public id: string
    public title: string
    public content_url: string
    public created_by_id: string
    public created_at: Date
}