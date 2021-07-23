<?php

namespace App\Http\Controllers\api\category;

use App\Http\Controllers\Controller;
use App\Models\Category;
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
        $category = Category::where('userId', $user->id)->get();

        return response()->json([
            'success' => true,
            'category' => $category
        ]);
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
        $create = Category::create([
            'userId' => $user->id,
            'name' => $request->post('name')
        ]);

        if ($create) {
            return response()->json([
                'success' => true,
            ]);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Kategori Eklenemedi!'
            ]);
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
        $category = Category::where([
            ['userId', $user->id],
            ['id', $id]
        ])->first();

        return response()->json([
            'success' => true,
            'category' => $category
        ]);
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
        $update = Category::find($id);

        if (!$update) {
            return response()->json([
                'success' => false,
                'message' => 'Güncellenirken Bir Hata Oluştu!'
            ]);
        }

        $update->update([
            'name' => $request->name
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Kategori Başarıyla Güncellendi'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        if(Category::where('id', $id)->delete()){
            return response()->json([
                'success' => true,
                'message' => 'Kategori Başarıyla Silindi'
            ]);
        }else{
            return response()->json([
                'success' => false,
                'message' => 'Kategori Silinemedi'
            ]);
        }
    }
}
