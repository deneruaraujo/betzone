import { Entity } from 'src/core/entities/entity';
import { UniqueEntityId } from 'src/core/entities/unique-entity-id';
import { ActivityStatus } from 'src/core/enum/activityStatus.enum';
import { Optional } from 'src/core/types/optional';

export interface ActivityProps {
  name: string;
  description: string;
  status: ActivityStatus;
  category: string;
  createdAt: Date;
  updatedAt?: Date | null;
}

export class Activity extends Entity<ActivityProps> {
  private touch() {
    this.props.updatedAt = new Date();
  }

  get name() {
    return this.props.name;
  }

  set name(name: string) {
    this.props.name = name;
    this.touch();
  }

  get description() {
    return this.props.description;
  }

  set description(description: string) {
    this.props.description = description;
    this.touch();
  }

  get status() {
    return this.props.status;
  }

  set status(status: ActivityStatus) {
    this.props.status = status;
    this.touch();
  }

  get category() {
    return this.props.category;
  }

  set category(category: string) {
    this.props.category = category;
    this.touch();
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  static create(
    props: Optional<ActivityProps, 'createdAt'>,
    id?: UniqueEntityId,
  ) {
    const activity = new Activity(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    );
    return activity;
  }
}
