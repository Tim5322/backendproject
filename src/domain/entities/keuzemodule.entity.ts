export class KeuzemoduleEntity {
  id: number;
  name: string;
  shortdescription: string;
  description: string;
  content: string;
  studycredit: number;
  location: string;
  contact_id: number;
  level: string;
  learningoutcomes: string;

  constructor(init?: Partial<KeuzemoduleEntity>) {
    Object.assign(this, init);
  }
}

export default KeuzemoduleEntity;
