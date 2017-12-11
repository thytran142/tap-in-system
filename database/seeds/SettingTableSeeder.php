<?php

use Illuminate\Database\Seeder;

class SettingTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('setting')->insert([
             [
            'id' => 1,
            'key'=>'salary',
            'value'=>'10',
            'created_at' => \Carbon\Carbon::now()->toDateTimeString()
        ],
        [
            'id'=>2,
            'key'=>'flag_tap',
            'value'=>'false',
            'created_at' => \Carbon\Carbon::now()->toDateTimeString()
        ]
        ]);
    }
}
