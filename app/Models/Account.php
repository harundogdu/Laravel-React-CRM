<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Account extends Model
{
    use HasFactory;

    const ACCOUNT_TYPE_SUPPLIER = 0;
    const ACCOUNT_TYPE_CUSTOMER = 1;

    protected $guarded = [];
    protected $appends = ['accountTypeString'];

    public function getaccountTypeStringAttribute()
    {
        switch ($this->attributes['accountType']) {
            case self::ACCOUNT_TYPE_SUPPLIER:
                return 'Tedarikçi';
                break;
            case self::ACCOUNT_TYPE_CUSTOMER:
                return 'Müşteri';
                break;
        }
    }
}
