<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    protected $guarded = [];

    public function property(){
        return $this->hasMany('App\Models\ProductProperty','productId','id');
    }
    public function images(){
        return $this->hasMany('App\Models\ProductImage','productId','id');
    }
}
