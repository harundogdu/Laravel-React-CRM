<?php

namespace App\Http\Controllers\api\product;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use App\Helper\fileUpload;
use App\Models\ProductImage;
use App\Models\ProductProperty;

use function PHPUnit\Framework\returnValue;

class indexController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $user = request()->user();
        $categories = Category::where('userId', $user->id)->get();
        return response()->json([
            'success' => true,
            'categories' => $categories
        ]);
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
        $file = isset($all['file']) ? $all['file'] : [];
        $property = isset($all['property']) ? json_decode($all['property']) : [];
        unset($all['file']);
        unset($all['property']);

        $create = Product::create($all);

        if ($create) {
            foreach ($file as $item) {
                $upload = fileUpload::newUpload(rand(1, 900000), 'products', $item, 0);
                ProductImage::create([
                    'productId' => $create->id,
                    'path' => $upload
                ]);
            }

            foreach ($property as $item) {
                ProductProperty::create([
                    'productId' => $create->id,
                    'property' => $item->property,
                    'value' => $item->value
                ]);
            }
        }

        return response()->json([
            'success' => true,
            'message' => "Dosyalar Başarıyla Yüklendi!"
        ]);
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
        //
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
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
