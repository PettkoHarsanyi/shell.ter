import { Migration } from '@mikro-orm/migrations';

export class Migration20220508110530 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `user` (`id` integer not null primary key autoincrement, `name` text not null, `user_name` text not null, `password` text not null, `age` integer not null, `is_employee` integer not null, `strength` integer not null, `role` integer not null);');
    this.addSql('create unique index `user_user_name_unique` on `user` (`user_name`);');

    this.addSql('create table `dog` (`id` integer not null primary key autoincrement, `name` text not null, `type` text not null, `age` integer not null, `weight` integer not null, `strength` integer not null, `created_at` datetime not null, `modified_at` datetime not null);');

    this.addSql('create table `walk` (`id` integer not null primary key autoincrement, `duration` integer not null, `dog_id` integer not null, `walker_id` integer not null, `created_at` datetime not null, `modified_at` datetime not null, constraint `walk_dog_id_foreign` foreign key(`dog_id`) references `dog`(`id`) on update cascade, constraint `walk_walker_id_foreign` foreign key(`walker_id`) references `user`(`id`) on update cascade);');
    this.addSql('create index `walk_dog_id_index` on `walk` (`dog_id`);');
    this.addSql('create index `walk_walker_id_index` on `walk` (`walker_id`);');

    this.addSql('create table `user_dogs` (`user_id` integer not null, `dog_id` integer not null, constraint `user_dogs_user_id_foreign` foreign key(`user_id`) references `user`(`id`) on delete cascade on update cascade, constraint `user_dogs_dog_id_foreign` foreign key(`dog_id`) references `dog`(`id`) on delete cascade on update cascade, primary key (`user_id`, `dog_id`));');
    this.addSql('create index `user_dogs_user_id_index` on `user_dogs` (`user_id`);');
    this.addSql('create index `user_dogs_dog_id_index` on `user_dogs` (`dog_id`);');
  }

}
