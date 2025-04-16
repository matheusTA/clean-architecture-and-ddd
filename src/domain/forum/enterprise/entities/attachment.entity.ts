import { Entity } from '@/core/entities/entity';
import type { UniqueEntityID } from '@/core/entities/unique-entity-id';

interface AttachmentProps {
	title: string;
	link: string;
}

export class Attachment extends Entity<AttachmentProps> {
	static build(props: AttachmentProps, id?: UniqueEntityID) {
		const attachment = new Attachment(props, id);

		return attachment;
	}

	get title() {
		return this.props.title;
	}

	get link() {
		return this.props.link;
	}

	set title(title: string) {
		this.props.title = title;
	}

	set link(link: string) {
		this.props.link = link;
	}
}
