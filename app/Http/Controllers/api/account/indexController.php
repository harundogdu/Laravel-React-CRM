<?php

namespace App\Http\Controllers\api\account;

use App\Http\Controllers\Controller;
use App\Models\Account;
use Illuminate\Http\Request;

class indexController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $user = request()->user();
        $accounts = Account::where('userId', $user->id)->get();

        if ($accounts) return response()->json(['success', true, 'accounts' => $accounts]);
        else return response()->json(['success', false, 'message' => 'Hesaplar Getirilemedi']);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $user = request()->user();
        $all = $request->all();
        $all['userId'] = $user->id;
        if (Account::create($all)) {
            return response()->json(['success' => true, 'message' => 'Hesap Başarıyla Eklendi']);
        } else {
            return response()->json(['success' => false, 'message' => 'Hesap Eklenirken Bir Sorun Oluştu']);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $user = request()->user();
        $account = Account::where('userId', $user->id)->where('id', $id)->first();
        if ($account) {
            return response()->json(['success' => true, 'account' => $account]);
        } else {
            return response()->json(['success' => true, 'message' => 'Bir Sorun Oluştu']);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $user = request()->user();
        $all = $request->post();
        unset($all['_method']);
        $account = Account::where('userId', $user->id)->where('id', $id)->first();
        if ($account) {
            $account->update($all);
            return response()->json(['success' => true, 'message' => 'Hesap Başarıyla Güncellendi.']);
        } else return response()->json(['success' => false, 'message' => 'Hesabı Güncellemeye Yetkiniz Yok.']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $user = request()->user();

        if (Account::where([
            ['id', $id],
            ['userId', $user->id]
        ])->delete()) return response()->json(['success' => true, 'message' => 'Hesap Başarıyla Silindi.']);
        else return response()->json(['success' => false, 'message' => 'Hesap Silinemedi!']);
    }
}
